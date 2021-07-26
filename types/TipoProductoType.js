const { gql } = require('apollo-server-express');

const tipoProducto_type = gql`
    type TipoProducto{
        id: ID
        tipo: String,
        estado: Estado
    }

    type Query{
        obtenerTipoProductos: [TipoProducto]
    }

    input TipoProductoInput{
        tipo: String,
        estado: Estado
    }

    type RespuestaTipoProducto{
        estado: Boolean
        data: TipoProducto
        message: String
    }

    type Mutation{
        insertarTipoProductos(input:TipoProductoInput):RespuestaTipoProducto
        actualizarTipoProductos(id:ID, input:TipoProductoInput):TipoProducto
        desactivarTipoProducto(id:ID): RespuestaTipoProducto
    }
`;

module.exports = tipoProducto_type;