import {Cliente} from '../models';

export default{
    Query:{
        obtenerClientes: async (_, {}) => {
            try{
                const clientes = await Cliente.find({estado: "ACTIVO"});
                return clientes;
            }catch(error){
                return error;
            }
        },
        obtenerCliente: async (_, {id}) => {
            try{
                const cliente = await Cliente.findById(id);
                return cliente;
            }catch(error){
                return error;
            }
        }
    },
    Mutation:{
        insertarCliente: async (_, {input}) => {
            try{
                const { codigo } = input;
                const existe = await Cliente.findOne({codigo});
                if(existe){
                    return {
                        estado: false,
                        data: null,
                        message: "El cliente ya existe"
                    };
                }else{
                    const cliente = new Cliente(input);
                    const result = await cliente.save();
                    return {
                        estado: true,
                        data: result,
                        message: "El cliente fue registrado con éxito"
                    };
                }
            }catch(error){
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar el cliente"
                };
            }
        },
        actualizarCliente: async (_, {id, input}) => {
            try{
                const cliente = await Cliente.findOneAndUpdate({_id: id}, input, {new: true});
                return {
                    estado: true,
                    data: cliente,
                    message: "El cliente fue actualizado con éxito"
                };
            }catch(error){
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar el cliente"
                };
            }
        },
        desactivarCliente: async (_, {id}) => {
            try{
                const cliente = await Cliente.findOneAndUpdate({_id: id}, {estado: "INACTIVO"}, {new: true});
                if(cliente){
                    return {
                        estado: true,
                        data: null,
                        message: "Cliente eliminado correctamente"
                    };
                }else{
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el cliente"
                    };
                }
            }catch(error){
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al eliminar el cliente"
                };
            }
        }
    }
}