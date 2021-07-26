const { gql } = require('apollo-server-express');

const cotizacion_type = gql`

    scalar Number,

    enum EstadoCotizacion{
        REGISTRADA
        ENVIADA
    }

    type Capsula{
        materia_prima: MateriaPrima
        precio_kilo: Number
    }

    type Cotizacion{
        id: ID
        formula: formula
        tipoProducto: TipoProducto,
        cliente: Cliente
        pesoCapsula: String
        cantidad: Number
        costoCapsula: Number
        envases: Number
        costoEnvase: Number
        etiqueta: Number
        costoEtiqueta: Number
        venta: Number
        elementos: [MateriaPrima]
        porcentajes: [Number]
        precio_kilo: [Number]
        capsula: [MateriaPrima]
        precios_capsula: [Number]
        cantidad_capsula: [Number]
        agua_purificada: Number
        estado: EstadoCotizacion
        status: Estado
    }

    input cotizacion{
        formula: ID
        tipoProducto: ID
        cliente: ID
        pesoCapsula: String
        cantidad: Number
        costoCapsula: Number
        envases: Number
        costoEnvase: Number
        etiqueta: Number
        costoEtiqueta: Number
        venta: Number
        elementos: [ID]
        porcentajes: [Number]
        precio_kilo: [Number]
        capsula: [ID]
        precios_capsula: [Number]
        cantidad_capsula: [Number]
        agua_purificada: Number
        estado: EstadoCotizacion
        status: Estado
    }    

    input Materia{
        id: ID
        total: Number
    }
    
    type Respuesta{
        estado: Boolean,
        message: String
    }

    type Query{
        obtenerCotizaciones: [Cotizacion]
        obtenerCotizacion(id:ID): Cotizacion
    }

    type Mutation{
        insertarCotizacion(input:cotizacion):Respuesta
        actualizarCotizacion(id:ID, input:cotizacion):Respuesta
        desactivarCotizacion(id:ID):Respuesta
    }

    input salida{
        tipo: Tipo
        lote: String
        codigo: String
        fecha: Date
        cantidad: Number
        unidad: Unidad
        usuario: ID
        materia_prima: ID
    }

`;

module.exports = cotizacion_type;