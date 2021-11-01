import { Movimientos, Cotizacion } from '../models';
import mongoose from 'mongoose'
import { google } from 'googleapis'
import { Storage } from '@google-cloud/storage'
import path from 'path'
import { createReadStream } from 'fs';

export default {
    Query: {
        obtenerMovimientos: async (_, { id }) => {
            try {
                const storage = new Storage({
                    keyFilename: path.join(__dirname, '../google_cloud_data.json'),
                    projectId: 'causal-rite-327202'
                });
                const options = {
                    version: 'v4',
                    action: 'read',
                    expires: Date.now() + 1440 * 60 * 1000,
                };
                const mov = await Movimientos.find({ materia_prima: id }).populate('usuario').populate('materia_prima').populate('proveedor');
                var movimientos = []
                for(var m in mov){
                    const url = await storage.bucket('bucket_pro_capsulas').file('archivos_coa/' + mov[m].cao).getSignedUrl(options)
                    movimientos.push({
                        id: mov[m].id,
                        tipo: mov[m].tipo,
                        lote: mov[m].lote,
                        proveedor: mov[m].proveedor,
                        codigo: mov[m].codigo,
                        fechaFabricacion: mov[m].fechaFabricacion,
                        fechaVencimiento: mov[m].fechaVencimiento,
                        fecha: mov[m].fecha,
                        cantidad: mov[m].cantidad,
                        existencia: mov[m].existencia,
                        precio: mov[m].precio,
                        precio_unidad: mov[m].precio_unidad,
                        moneda: mov[m].moneda,
                        cao: url.toString(),
                        usuario: mov[m].usuario,
                        materia_prima: mov[m].materia_prima
                    })
                }
                return movimientos;
            } catch (error) {
                return error;
            }
        },
        obtenerMovimientos2: async (_, { id }) => {
            try {
                const mov = await Movimientos.find({ materia_prima: id, tipo: 'ENTRADA' }).populate('usuario').populate('materia_prima').populate('proveedor');
                for(var m in mov){
                    const result = await Movimientos.find({ lote: mov[m].lote, tipo: 'SALIDA', materia_prima: mov[m].materia_prima });
                    var cant = mov[m].cantidad
                    for(var r in result){
                        cant -= result[r].cantidad
                    }
                    mov[m].existencia = cant
                }
                return mov
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarMovimiento: async (_, { input }) => {
            try {
                const mov = new Movimientos(input);
                const result = await mov.save();
                return {
                    estado: true,
                    data: result,
                    message: "Se registro correctamente el movimiento"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar el movimiento"
                }
            }
        },
        insertarSalida: async (_, { input }) => {
            try {
                const mov = new Movimientos(input);
                const result = await mov.save();
                return {
                    estado: true,
                    data: null,
                    message: "Se registro correctamente la salida"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar la salida"
                }
            }
        },
        verificarExistencias: async (_, { input }) => {
            var band = false, message = ""
            try {
                const { items } = input
                items.map(item => {
                    const result = Movimientos.find({ materia_prima: item.id })
                    var total = 0;
                    result.map(r => {
                        if (r.tipo === 'ENTRADA') {
                            total += r.cantidad
                        } else {
                            total -= r.cantidad
                        }
                    })
                    if (total > item.cantidad) {
                        if (!band) {
                            band = true
                        }
                        message += "Falta material en: " + item.nombre + "\n"
                    }
                })
                if (band) {
                    return {
                        estado: 2,
                        message: message
                    }
                } else {
                    return {
                        estado: 1,
                        message: "Existe suficiente material para ejecutar la cotización"
                    }
                }
            } catch (error) {
                console.log(error)
                return {
                    estado: 3,
                    message: "Hubo un error al itentar verificar las existencias"
                }
            }
        },
        enviarProduccion: async (_, { input }) => {
            const { usuario, cotizacion, elementos } = input
            var date = new Date();
            var fecha = date.getFullYear() + "-" + (((date.getMonth() + 1) < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + ((date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate());
            const session = await mongoose.startSession()
            session.startTransaction()
            try {
                const opts = { session, new: true }
                for (let i = 0; i < elementos.length; i++) {
                    var item = elementos[i]
                    var cant = item.cantidad
                    const result = await Movimientos.find({ materia_prima: item.id })
                    for (let j = 0; j < result.length; j++) {
                        var r = result[j]
                        if (cant > 0) {
                            if (r.tipo === 'ENTRADA') {
                                if (r.existencia < cant) {
                                    var salida = {
                                        tipo: 'SALIDA',
                                        lote: r.lote,
                                        proveedor: r.proveedor,
                                        codigo: r.codigo,
                                        fecha: fecha,
                                        cantidad: r.existencia,
                                        usuario: usuario,
                                        materia_prima: r.materia_prima
                                    }
                                    await Movimientos.findOneAndUpdate({ _id: r.id }, { existencia: 0 }, { new: true })
                                    const saveSalida = new Movimientos(salida);
                                    await saveSalida.save()
                                    cant -= r.existencia
                                } else {
                                    var salida = {
                                        tipo: 'SALIDA',
                                        lote: r.lote,
                                        proveedor: r.proveedor,
                                        codigo: r.codigo,
                                        fecha: fecha,
                                        cantidad: cant,
                                        usuario: usuario,
                                        materia_prima: r.materia_prima
                                    }
                                    var newExistencia = r.existencia - cant;
                                    await Movimientos.findOneAndUpdate({ _id: r.id }, { existencia: newExistencia }, { new: true })
                                    const saveSalida = new Movimientos(salida);
                                    await saveSalida.save()
                                    cant = 0
                                }
                            }
                        }
                    }
                }
                await Cotizacion.findOneAndUpdate({ _id: cotizacion }, { estado: 'ENVIADA' }, { new: true })
                await session.commitTransaction()
                session.endSession();
                return {
                    estado: true,
                    data: null,
                    message: "La cotización fue enviada a producción"
                }
            } catch (error) {
                await session.abortTransaction()
                session.endSession();
                console.log(error)
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperada al enviar la cotización a producción"
                }
            }
        },
        subirArchivoCOA: async (_, { file }) => {
            try {
                var newFilename = new Date().getTime();
                const { createReadStream, filename } = await file;
                newFilename = newFilename + "_" + filename;
                const gcStorage = new Storage({
                    keyFilename: path.join(__dirname, '../google_cloud_data.json'),
                    projectId: 'causal-rite-327202'
                });
                const bucket = gcStorage.bucket('bucket_pro_capsulas')
                await new Promise((res) =>
                    createReadStream()
                        .pipe(bucket.file(`archivos_coa/${newFilename}`)
                            .createWriteStream({ resumable: true, gzip: true }))
                        .on('finish', res)
                )
                return {
                    estado: true,
                    filename: newFilename,
                    message: "El archivo fue subido con éxito"
                }
            } catch (error) {
                return {
                    estado: false,
                    filename: "vacio",
                    message: "El archivo no puedo ser subido..."
                }
            }
        }
    }
}