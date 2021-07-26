const mongoose = require('mongoose');

const CotizacionSchema = mongoose.Schema({
    formula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'formulas'
    },
    tipoProducto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tipoProductos'
    },
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientes'
    },
    pesoCapsula: {
        type: String,
        require: true,
        trim: true
    },
    cantidad: {
        type: Number,
        require: true,
        trim: true
    },
    costoCapsula: {
        type: Number,
        require: true,
        trim: true
    },
    envases: {
        type: Number,
        require: true,
        trim: true
    },
    costoEnvase: {
        type: Number,
        require: true,
        trim: true
    },
    etiqueta: {
        type: Number,
        require: true,
        trim: true
    },
    costoEtiqueta: {
        type: Number,
        require: true,
        trim: true
    },
    venta: {
        type: Number,
        require: true,
        trim: true
    },
    elementos: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'MateriasPrimas'
    }],
    porcentajes: {
        type: Array,
        require: true
    },
    precio_kilo: {
        type: Array,
        require: true
    },
    capsula: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'MateriasPrimas'
    }],
    cantidad_capsula:{
        type: Array
    },
    agua_purificada:{
        type: Number,
    },
    precios_capsula: {
        type: Array
    },
    estado:{
        type: String,
        require: true,
        trim: true
    },
    status:{
        type: String,
        require: true,
        trim: true
    }
})

module.exports = mongoose.model('Cotizaciones', CotizacionSchema);