const { gql } = require('apollo-server-express');

const cliente_type = gql`

    type Cliente{
        id: ID
        nombre: String
        tipo: String
        codigo: String
        pais: String
        ciudad: String
        city: String
        calle: String
        cp: String
        direccion: String
        telefonos: [Telefono]
        correos: [Email]
        redes: [RedSocial]
        estado: Estado
    }

    type Query{
        obtenerClientes: [Cliente]
        obtenerCliente(id:ID): Cliente
    }

    input ClienteInput{
        tipo: String
        nombre: String
        codigo: String
        pais: String
        ciudad: String
        city: String
        calle: String
        cp: String
        direccion: String
        telefonos: [TelefonoInput]
        correos: [EmailInput]
        redes: [RedSocialInput]
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