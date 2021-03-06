import { Movimientos, Cotizacion } from '../models';
import mongoose from 'mongoose'

export default {
    Query: {
        obtenerMovimientos: async (_, { id }) => {
            try {
                const mov = await Movimientos.find({ materia_prima: id }).populate('usuario').populate('materia_prima');
                return mov;
            } catch (error) {
                return error;
            }
        },
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
                        message: "Existe suficiente material para ejecutar la cotizaci??n"
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
                const opts = {session, new:true}
                for(let i = 0; i < elementos.length; i++){
                    var item = elementos[i]
                    var cant = item.cantidad
                    const result = await Movimientos.find({ materia_prima: item.id})
                    for(let j = 0; j < result.length; j++){
                        var r = result[j]
                        if (cant > 0) {
                            if (r.tipo === 'ENTRADA') {
                                if (r.existencia < cant) {
                                    var salida = {
                                        tipo: 'SALIDA',
                                        lote: r.lote,
                                        codigo: r.codigo,
                                        fecha: fecha,
                                        cantidad: r.existencia,
                                        usuario: usuario,
                                        materia_prima: r.materia_prima
                                    }
                                    await Movimientos.findOneAndUpdate({_id: r.id}, {existencia: 0}, {new: true })
                                    const saveSalida = new Movimientos(salida);
                                    await saveSalida.save()
                                    cant -= r.existencia
                                } else {
                                    var salida = {
                                        tipo: 'SALIDA',
                                        lote: r.lote,
                                        codigo: r.codigo,
                                        fecha: fecha,
                                        cantidad: cant,
                                        usuario: usuario,
                                        materia_prima: r.materia_prima
                                    }
                                    var newExistencia = r.existencia - cant;
                                    await Movimientos.findOneAndUpdate({_id: r.id}, {existencia: newExistencia}, {new: true })
                                    const saveSalida = new Movimientos(salida);
                                    await saveSalida.save()
                                    cant = 0
                                }
                            }
                        }
                    }
                }
                await Cotizacion.findOneAndUpdate({_id: cotizacion}, {estado: 'ENVIADA'}, {new:true})
                await session.commitTransaction()
                session.endSession();
                return{
                    estado: true,
                    data: null,
                    message: "La cotizaci??n fue enviada a producci??n"
                }
            } catch (error) {
                await session.abortTransaction()
                session.endSession();
                console.log(error)
                return{
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperada al enviar la cotizaci??n a producci??n"
                }
            }
        }
    }
}