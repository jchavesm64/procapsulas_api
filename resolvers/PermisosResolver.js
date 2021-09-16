import { Permiso } from "../models";

export default {
    Query: {
        obtenerPermisos: async (_, { }) => {
            try {
                const permisos = Permiso.find();
                return permisos
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarPermiso: async (_, { input }) => {
            try {
                const { descripcion } = input;
                const existe = await Permiso.findOne({ descripcion });
                if (existe) {
                    return "El permiso ya existe";
                } else {
                    const permiso = new Permiso(input);
                    const result = await permiso.save();
                    return result;
                }
            } catch (error) {
                return error;
            }
        },
        actualizarPermiso: async (_, { id, input }) => {
            try {
                const permiso = await Permiso.findOneAndUpdate({ _id: id }, input, { new: true });
                return permiso;
            } catch (error) {
                return error;
            }
        },
        desactivarPermiso: async (_, { id }) => {
            try {
                const permiso = await Permiso.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (permiso) {
                    return "Permiso eliminado correctamente";
                } else {
                    return "No se pudo eliminar el permiso";
                }
            } catch (error) {
                return error;
            }
        }
    }
}