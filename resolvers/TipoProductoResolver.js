import { TipoProducto } from '../models';

export default {
    Query: {
        obtenerTipoProductos: async (_, { }) => {
            try {
                const tipos = await TipoProducto.find({ estado: "ACTIVO" });
                return tipos.sort(function(a, b){
                    if(a.tipo > b.tipo){
                        return 1
                    }
                    if(a.tipo < b.tipo){
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarTipoProductos: async (_, { input }) => {
            try {
                const { tipo } = input;
                const existe = await TipoProducto.findOne({ tipo });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "El tipo de producto ya existe"
                    }
                } else {
                    const tipoProducto = new TipoProducto(input);
                    const result = await tipoProducto.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Tipo de producto, agregado correctamente"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar el tipo de producto"
                }
            }
        },
        actualizarTipoProductos: async (_, { id, input }) => {
            try {
                const tipo = await TipoProducto.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: tipo,
                    message: "Tipo de producto, actualizado correctamente"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el tipo de producto"
                }
            }
        },
        desactivarTipoProducto: async (_, { id }) => {
            try {
                const tipo = await TipoProducto.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (tipo) {
                    return {
                        estado: true,
                        data: null,
                        message: "Tipo de producto eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el tipo de producto"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio en error inesperado al eliminar el tipo de producto"
                }
            }
        }
    }
}