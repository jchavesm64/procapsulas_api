const { gql } = require('apollo-server-express');

const rol_type = gql`
    enum tipo_rol{
        ADMINISTRADOR
        GESTOR
    }

    type Acciones{
        editar:Boolean
        eliminar:Boolean
        agregar:Boolean
    }

    type Rol{
        id: ID
        tipo: tipo_rol
        permisos: [Permiso]
        acciones: [Acciones]
        estado: Estado
    }

    type Query{
        obtenerRoles: [Rol]
    }

    input AccionesInput{
        editar:Boolean
        eliminar:Boolean
        agregar:Boolean
    }

    input RolInput{
        tipo: tipo_rol
        permisos: [ID]
        acciones: [AccionesInput]
        estado: Estado
    }

    type RespuestaRol{
        estado: Boolean
        data: Rol
        message: String
    }

    type Mutation{
        insertarRol(input:RolInput):RespuestaRol
        actualizarRol(id:ID, input:RolInput):RespuestaRol
        desactivarRol(id:ID):RespuestaRol
    }
`;

module.exports = rol_type;