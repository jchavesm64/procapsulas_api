import { Proveedor } from '../models';

export default {
    Query: {
        obtenerProveedores: async (_, { }) => {
            try {
                const proveedores = await Proveedor.find({ estado: "ACTIVO" }).populate('provedurias');
                return proveedores.sort(function(a, b){
                    if(a.empresa > b.empresa){
                        return 1
                    }
                    if(a.empresa < b.empresa){
                        return -1
                    }
                    return 0;
                });;
            } catch (error) {
                return error;
            }
        },
        obtenerProveedor: async (_, {id}) => {
            try{
                const proveedor = await Proveedor.findById(id).populate('provedurias');
                return proveedor;
            }catch(error){
                return error;
            }
        }
    },
    Mutation: {
        insertarProveedor: async (_, { input }) => {
            try {
                const { cedula } = input;
                const existe = await Proveedor.findOne({ cedula });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "El proveedor ya esta registrado"
                    };
                } else {
                    const proveedor = new Proveedor(input);
                    const result = await proveedor.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Proveedor registrado con éxito"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar el proveedor"
                };
            }
        },
        actualizarProveedor: async (_, { id, input }) => {
            try {
                const proveedor = await Proveedor.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: proveedor,
                    message: "Proveedor actualizado con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el proveedor"
                };
            }
        },
        desactivarProveedor: async (_, { id }) => {
            try {
                const proveedor = await Proveedor.findOneAndUpdate({ _id: id }, { estado: "INACTIVO" }, { new: true });
                if (proveedor) {
                    return {
                        estado: true,
                        data: null,
                        message: "Proveedor eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el porveedor"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al desactivar el proveedor"
                };
            }
        }
    }
}