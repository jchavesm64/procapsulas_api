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
        presentacion: TipoProducto,
        cliente: Cliente
        peso: String
        elementos: [MateriaPrima]
        porcentajes: [Number]
        precios: [Number]
        cant_cap: Number
        cost_cap: Number
        cant_env: Number
        cost_env: Number
        cant_eti: Number
        cost_eti: Number
        venta: Number
        dosis: Number
        serving: Number
        agua: Number
        elementos_c: [MateriaPrima]
        cantidad_c: [Number]
        precios_c: [Number]
        estado: EstadoCotizacion
        status: Estado
    }

    input cotizacion{
        formula: ID
        presentacion: ID,
        cliente: ID
        peso: String
        elementos: [ID]
        porcentajes: [Number]
        precios: [Number]
        cant_cap: Number
        cost_cap: Number
        cant_env: Number
        cost_env: Number
        cant_eti: Number
        cost_eti: Number
        venta: Number
        dosis: Number
        serving: Number
        agua: Number
        elementos_c: [ID]
        cantidad_c: [Number]
        precios_c: [Number]
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