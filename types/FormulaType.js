const { gql } = require('apollo-server-express');

const formula_type = gql`
    scalar Number

    type formula{
        id: ID
        nombre: String
        elementos: [MateriaPrima]
        formulaBase: formula_base
        cliente: Cliente
        porcentajes: [Number]
        estado: Estado
    }

    type formulaCompleta{
        id: ID
        nombre: String
        elementos: [MateriaPrimaMovimientos]
        porcentajes: [Number]
        formulaBase: formula_base_2
    }

    type Query{
        obtenerFormulas: [formula]
        obtenerFormula(id: ID): formula
        obtenerFormulasConMovimiento: [formulaCompleta]
    }

    input formulaInput{
        nombre: String
        elementos: [ID]
        formulaBase: ID
        cliente: ID
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