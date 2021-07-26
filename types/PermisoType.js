const { gql } = require('apollo-server-express');

const permiso_type = gql`
    type Permiso{
        id: ID
        descripcion: String,
        estado: Estado
    }

    type Query {
        obtenerPermisos: [Permiso]
    }

    input PermisoInput{
        descripcion: String,
        estado: Estado
    }

    type Mutation {
        insertarPermiso(input:PermisoInput):Permiso
        actualizarPermiso(id:ID, input:PermisoInput):Permiso
        desactivarPermiso(id:ID):String
    }
`;

module.exports = permiso_type;