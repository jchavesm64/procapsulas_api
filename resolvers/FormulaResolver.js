import { Formulas, Movimientos } from "../models";

export default {
    Query: {
        obtenerFormulas: async (_, { }) => {
            try {
                const formulas = await Formulas.find({ estado: 'ACTIVO' }).populate({path: 'formulaBase', populate: [{path: 'elementos'}]}).populate({ path: 'elementos', populate: [{ path: 'proveedor' }] }).populate('cliente')
                return formulas.sort(function(a, b){
                    if(a.nombre > b.nombre){
                        return 1
                    }
                    if(a.nombre < b.nombre){
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error
            }
        },
        obtenerFormulasConMovimiento: async (_, { }) => {
            try {
                var retorno = []
                const formulas = await Formulas.find({ estado: 'ACTIVO' }).populate({path: 'formulaBase', populate: [{path: 'elementos'}]}).populate({ path: 'elementos', populate: [{ path: 'proveedor' }] }).populate('cliente')
                formulas.map(item => {
                    var materiasmovimientos = []
                    item.elementos.map(ele => {
                        const result = Movimientos.find({ materia_prima: ele.id }).populate('usuario')
                        materiasmovimientos.push({
                            materia_prima: ele,
                            movimientos: result
                        })
                    })
                    retorno.push({
                        id: item.id,
                        nombre: item.nombre,
                        tipo: item.tipo,
                        formulaBase: item.formulaBase,
                        elementos: materiasmovimientos,
                        porcentajes: item.porcentajes
                    })
                })
                return retorno
            } catch (error) {
                return error
            }
        },
        obtenerFormula: async (_, { id }) => {
            try {
                const formula = await Formulas.findById(id).populate({path: 'formulaBase', populate: [{path: 'elementos'}]}).populate({ path: 'elementos', populate: [{ path: 'proveedor' }] }).populate('cliente');
                return formula
            } catch (error) {
                return error
            }
        }
    },
    Mutation: {
        insertarFormula: async (_, { input }) => {
            try {
                const formula = new Formulas(input);
                const result = await formula.save();
                return {
                    estado: true,
                    data: result,
                    message: "La formula fue registrado con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar la formula"
                };
            }
        },
        actualizarFormula: async (_, { id, input }) => {
            try {
                const formula = await Formulas.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: formula,
                    message: "la formula fue actualizado con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al actualizar la formula"
                };
            }
        },
        desactivarFormula: async (_, { id }) => {
            try {
                const formula = await Formulas.findOneAndUpdate({ _id: id }, { estado: "INACTIVO" }, { new: true });
                if (formula) {
                    return {
                        estado: true,
                        data: null,
                        message: "Formula eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la formula"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al eliminar la formula"
                };
            }
        }
    }
}