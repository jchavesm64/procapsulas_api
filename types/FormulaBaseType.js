const { gql } = require('apollo-server-express');

const formula_base_type = gql`
    
    type formula_base{
        id: ID
        nombre: String
        elementos: [MateriaPrima]
        estado: Estado
    }

    type formula_base_2{
        id: ID
        nombre: String
        elementos: [MateriaPrimaMovimientos]
        estado: Estado
    }

    type Query{
        obtenerFormulasBase: [formula_base]
        obtenerFormulaBase(id:ID): formula_base
    }

    input formula_base_input{
        nombre: String
        elementos: [ID]
        estado: Estado
    }

    type RespuestaFormulaBase{
        estado: Boolean
        data: formula_base
        message: String
    }

    type Mutation{
        insertarFormulaBase(input:formula_base_input):RespuestaFormulaBase
        actualizarFormulaBase(id:ID, input:formula_base_input):RespuestaFormulaBase
        desactivarFormulaBase(id:ID):RespuestaFormulaBase
    }
`;

module.exports = formula_base_type;