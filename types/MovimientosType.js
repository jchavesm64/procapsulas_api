const { gql } = require('apollo-server-express');

const movimientos_type = gql`
    scalar Date
    scalar Number

    enum Tipo{
        ENTRADA
        SALIDA
    }    

    type MovimientosType{
        id: ID
        tipo: Tipo
        lote: String
        proveedor: Proveedor
        codigo: String
        fechaFabricacion: Date
        fechaVencimiento: Date
        fecha: Date
        cantidad: Number
        existencia: Number
        precio: Number
        precio_unidad: Number
        moneda: String
        cao: String
        usuario: Usuario
        materia_prima: MateriaPrima
    }

    type RespuestaMovimientos{
        estado: Boolean
        data: MovimientosType
        message: String
    }

    type RespuestaVerificar{
        estado: Number
        message: String
    }

    input item{
        id: ID
        nombre: String
        cantidad: Number
    }

    input salida{
        id: ID,
        cantidad: Number
    }

    input salidas{
        usuario: ID
        cotizacion: ID
        elementos: [salida]
    }

    input salida_inventario{
        tipo: Tipo
        lote: String
        proveedor: ID
        codigo: String
        fecha: Date
        cantidad: Number
        usuario: ID
        materia_prima: ID
    }

    input MovimientosInput{
        tipo: Tipo
        lote: String
        codigo: String
        proveedor: ID
        fechaFabricacion: Date
        fechaVencimiento: Date
        fecha: Date
        cantidad: Number
        existencia: Number
        precio: Number
        precio_unidad: Number
        moneda: String
        cao: String
        usuario: ID
        materia_prima: ID
    }

    input Items{
        items: [item]
    }

    type Query{
        obtenerMovimientos(id:ID): [MovimientosType]
        obtenerMovimientos2(id:ID): [MovimientosType]
    }

    type RespuestaUpload{
        estado: Boolean
        filename: String
        message: String
    }

    type Mutation{
        insertarMovimiento(input:MovimientosInput):RespuestaMovimientos
        insertarSalida(input:salida_inventario):RespuestaMovimientos
        verificarExistencias(input:Items):RespuestaVerificar
        enviarProduccion(input:salidas):RespuestaMovimientos
        subirArchivoCOA(file:Upload):RespuestaUpload
    }
`;

module.exports = movimientos_type;