import { MateriasPrimas } from '../models'
import { Movimientos } from '../models';

export default {
    Query: {
        obtenerMateriasPrimas: async (_, { }) => {
            try {
                const materias = await MateriasPrimas.find({ estado: 'ACTIVO' }).populate('proveedor');
                return materias
            } catch (error) {
                return error;
            }
        },
        obtenerMateriasPrimasConMovimientos: async (_, { }) => {
            try {
                var materiasmovimientos = []
                const materias = await MateriasPrimas.find({ estado: 'ACTIVO' }).populate('proveedor');
                materias.map(item => {
                    const result = Movimientos.find({materia_prima: item.id}).populate('usuario')
                    materiasmovimientos.push({
                        materia_prima: item,
                        movimientos: result
                    })
                })
                return materiasmovimientos
            } catch (error) {
                return error;
            }
        },
        obtenerMateriaPrima: async (_, { id }) => {
            try {
                const materia = await MateriasPrimas.findById(id).populate('proveedor');
                return materia;
            } catch (error) {

            }
        }
    },
    Mutation: {
        insertarMateriaPrima: async (_, { input }) => {
            try {
                const materia = new MateriasPrimas(input);
                const result = await materia.save();
                return {
                    estado: true,
                    data: result,
                    message: "La materia prima fue registrada con éxito"
                };
            } catch (error) {
                console.log(error)
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar el MateriasPrimas"
                };
            }
        },
        actualizarMateriaPrima: async (_, { id, input }) => {
            try {
                const materia = await MateriasPrimas.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: materia,
                    message: "La materia prima fue actualizada con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar la materia prima"
                };
            }
        },
        desactivarMateriaPrima: async (_, { id }) => {
            try {
                const materia = await MateriasPrimas.findOneAndUpdate({ _id: id }, { estado: "INACTIVO" }, { new: true });
                if (MateriasPrimas) {
                    return {
                        estado: true,
                        data: null,
                        message: "Materia prima eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la materia prima"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al eliminar la materia prima"
                };
            }
        }
    }
}