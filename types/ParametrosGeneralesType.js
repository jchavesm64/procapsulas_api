const { gql } = require('apollo-server-express');

const parametrosGenerales_type = gql`

    type Parametro{
        id: ID
        codigo: String
        valor: String
        descripcion: String
    }

    input entrada_parametro{
        codigo: String
        valor: String
    }

    input Parametro_input{
        codigo: String
        valor: String
        descripcion: String
    }

    type Respuesta_parametro{
        estado: Boolean
        message: String
    }

    type Mutation{
        insertarParametro(input:Parametro_input):Respuesta_parametro
        validarParametro(input:entrada_parametro):Respuesta_parametro
    }
`;


module.exports = parametrosGenerales_type;