import { FormulaBase } from '../models';

export default {
    Query: {
        obtenerFormulasBase: async (_, { }) => {
            try {
                const formula = await FormulaBase.find({ estado: "ACTIVO" }).populate('elementos');
                return formula.sort(function(a, b){
                    if(a.nombre > b.nombre){
                        return 1
                    }
                    if(a.nombre < b.nombre){
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
        obtenerFormulaBase: async (_, { id }) => {
            try {
                const formula = await FormulaBase.findById(id).populate('elementos');
                return formula;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarFormulaBase: async (_, { input }) => {
            try {
                const formulaBase = new FormulaBase(input);
                const result = await formulaBase.save();
                return {
                    estado: true,
                    data: result,
                    message: "La fórmula base fue registrado con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar la fórmula base"
                };
            }
        },
        actualizarFormulaBase: async (_, { id, input }) => {
            try {
                const formulaBase = await FormulaBase.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: formulaBase,
                    message: "La fórmula base fue actualizado con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar la fórmula base"
                };
            }
        },
        desactivarFormulaBase: async (_, { id }) => {
            try {
                const formulaBase = await FormulaBase.findOneAndUpdate({ _id: id }, { estado: "INACTIVO" }, { new: true });
                if (formulaBase) {
                    return {
                        estado: true,
                        data: null,
                        message: "Formula base eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el la fórmula base"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al eliminar el la fórmula base"
                };
            }
        }
    }
}