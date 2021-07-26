const { gql } = require('apollo-server-express');

const proveedor_type = gql`
    type Proveedor{
        id: ID
        empresa: String
        cedula: String
        pais: String
        ciudad: String
        direccion: String
        telefonos: [Telefono]
        correos: [Email] 
        provedurias: [TipoProveduria]
        estado: Estado
    }

    type Query{
        obtenerProveedores: [Proveedor]
        obtenerProveedor(id:ID):Proveedor
    }

    input ProveedorInput{
        empresa: String
        cedula: String
        pais: String
        ciudad: String
        direccion: String
        telefonos: [TelefonoInput]
        correos: [EmailInput] 
        provedurias: [ID]
        estado: Estado
    }

    type RespuestaProveedor{
        estado: Boolean
        data: Proveedor
        message: String
    }

    type Mutation{
        insertarProveedor(input:ProveedorInput):RespuestaProveedor
        actualizarProveedor(id:ID, input:ProveedorInput):RespuestaProveedor
        desactivarProveedor(id:ID):RespuestaProveedor
    }
`;

module.exports = proveedor_type;