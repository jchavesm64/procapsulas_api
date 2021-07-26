const { gql } = require('apollo-server-express');

const tipoProveduria_type = gql`
    type TipoProveduria{
        id: ID
        tipo: String,
        estado: Estado
    }

    type Query{
        obtenerTipoProveduria: [TipoProveduria]
    }

    input TipoProveduriaInput{
        tipo: String,
        estado: Estado
    }

    type RespuestaTipoProveduria{
        estado: Boolean,
        data: TipoProveduria
        message: String
    }

    type Mutation{
        insertarTipoProveduria(input:TipoProveduriaInput):RespuestaTipoProveduria
        actualizarTipoProveduria(id:ID, input:TipoProveduriaInput):RespuestaTipoProveduria
        desactivarTipoProveduria(id:ID):RespuestaTipoProveduria
    }
`;

module.exports = tipoProveduria_type;