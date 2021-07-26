import { Rol } from "../models";

export default {
    Query: {
        obtenerRoles: async (_, { }) => {
            try {
                const roles = await Rol.find({estado: 'ACTIVO'}).populate('permisos');
                return roles;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarRol: async (_, { input }) => {
            try {
                const { tipo } = input;
                const existe = await Rol.findOne({ tipo });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "El rol ya existe"
                    };
                } else {
                    const rol = new Rol(input);
                    const result = await rol.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Rol creado con exito"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registro el rol"
                };
            }
        },
        actualizarRol: async (_, { id, input }) => {
            try {
                const rol = await Rol.findOneAndUpdate({ _id: id }, input, { new: true }).populate('permisos');
                return {
                    estado: true,
                    data: rol,
                    message: "Rol actualizado correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el rol"
                };
            }
        },
        desactivarRol: async (_, { id }) => {
            try {
                const rol = await Rol.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (rol) {
                    return {
                        estado: true,
                        data: null,
                        message: "Rol eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el rol"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar el rol"
                };
            }
        }
    }
}