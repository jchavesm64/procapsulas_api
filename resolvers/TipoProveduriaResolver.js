import { TipoProveduria } from '../models';

export default {
    Query: {
        obtenerTipoProveduria: async (_, { }) => {
            try {
                const tipos = await TipoProveduria.find({ estado: "ACTIVO" });
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
        insertarTipoProveduria: async (_, { input }) => {
            try {
                const { tipo } = input;
                const existe = await TipoProveduria.findOne({ tipo });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "El tipo de proveduria ya existe"
                    };
                } else {
                    const tipoProveduria = new TipoProveduria(input);
                    const result = await tipoProveduria.save();
                    return {
                        estado: true,
                        data: result,
                        message: "El tipo de proveduria fue agregado exitosamente"  
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al guardar el tipo de proveduria"
                };
            }
        },
        actualizarTipoProveduria: async (_, { id, input }) => {
            try {
                const tipo = await TipoProveduria.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: tipo,
                    message: "El tipo de proveduria fue actualizado exitosamente"  
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el tipo de proveduria"
                };
            }
        },
        desactivarTipoProveduria: async (_, { id }) => {
            try {
                const tipo = await TipoProveduria.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (tipo) {
                    return {
                        estado: true,
                        data: null,
                        message: "Tipo de proveduria eliminado correctamente"
                    }
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el tipo de proveduria"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar el tipo de proveduria"
                };
            }
        }
    }
}