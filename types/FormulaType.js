const { gql } = require('apollo-server-express');

const formula_type = gql`
    scalar Number

    enum TipoCapsula{
        POLVO
        BLANDA
    }

    type formula{
        id: ID
        tipo: TipoCapsula
        nombre: String
        elementos: [MateriaPrima]
        formulaBase: formula_base
        porcentajes: [Number]
        estado: Estado
    }

    type formulaCompleta{
        id: ID
        nombre: String
        tipo: TipoCapsula
        elementos: [MateriaPrimaMovimientos]
        porcentajes: [Number]
        formulaBase: formula_base
    }

    type Query{
        obtenerFormulas: [formula]
        obtenerFormula(id: ID): formula
        obtenerFormulasConMovimiento: [formulaCompleta]
    }

    input formulaInput{
        nombre: String
        tipo: TipoCapsula
        elementos: [ID]
        formulaBase: ID
        porcentajes: [Number],
        estado: Estado
    }

    type RespuestaFormula{
        estado: Boolean,
        data: formula,
        message: String
    }

    type Mutation{
        insertarFormula(input:formulaInput):RespuestaFormula
        actualizarFormula(id:ID, input:formulaInput):RespuestaFormula
        desactivarFormula(id:ID):RespuestaFormula
    }
`;

module.exports = formula_type;