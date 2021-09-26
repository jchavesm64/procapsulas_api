import { ParametrosGenerales } from "../models";

export default {
    Mutation:{
        validarParametro: async (_, {input}) => {
            try{
                const {codigo, valor} = input
                const parametro = await ParametrosGenerales.findOne({codigo})
                if(parametro){
                    if(parametro.valor = valor){
                        return {
                            estado: true,
                            message: 'Parámetro aceptado'
                        }
                    }else{
                        return {
                            estado: false,
                            message: 'El valor ingresado no es correcto'
                        }
                    }
                }else{
                    return {
                        estado: false,
                        message: 'El parámetro no fue encontrado'
                    }
                }
            }catch(error){
                return {
                    estado: false,
                    message: 'Hubo un error inesperado'
                }
            }
        },
        insertarParametro: async (_, { input }) => {
            try {
                const parametro = new ParametrosGenerales(input);
                await parametro.save();
                return {
                    estado: true,
                    message: "Se registro correctamente el parámetro"
                }
            } catch (error) {
                return {
                    estado: false,
                    message: "Ocurrio un error al registrar el parámetro"
                }
            }
        }
    }
}