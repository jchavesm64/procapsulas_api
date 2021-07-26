const { gql } = require('apollo-server-express');

const cliente_type = gql`
    enum TipoCliente{
        FISICO
        EMPRESA
    }

    type Cliente{
        id: ID
        nombre: String
        tipo: TipoCliente
        codigo: String
        pais: String
        ciudad: String
        direccion: String
        telefonos: [Telefono]
        correos: [Email]
        estado: Estado
    }

    type Query{
        obtenerClientes: [Cliente]
        obtenerCliente(id:ID): Cliente
    }

    input ClienteInput{
        tipo: TipoCliente
        nombre: String
        codigo: String
        pais: String
        ciudad: String
        direccion: String
        telefonos: [TelefonoInput]
        correos: [EmailInput]
        estado: Estado
    }

    type RespuestaCliente{
        estado: Boolean
        data: Cliente
        message: String
    }

    type Mutation{
        insertarCliente(input:ClienteInput):RespuestaCliente
        actualizarCliente(id:ID, input:ClienteInput):RespuestaCliente
        desactivarCliente(id:ID):RespuestaCliente
    }
`;

module.exports = cliente_type;