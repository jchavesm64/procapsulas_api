const mongoose = require('mongoose');

const CotizacionSchema = mongoose.Schema({
    formula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'formulas'
    },
    presentacion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tipoProductos'
    },
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientes'
    },
    peso: {
        type: String,
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
    precios: {
        type: Array,
        require: true
    },
    cant_cap: {
        type: Number
    },
    cost_cap: {
        type: Number
    },
    cant_env: {
        type: Number
    },
    cost_env: {
        type: Number
    },
    cant_eti: {
        type: Number
    },
    cost_eti: {
        type: Number
    },
    venta: {
        type: Number,
        require: true,
        trim: true
    },
    dosis: {
        type: Number,
    },
    serving: {
        type: Number,
    },
    agua: {
        type: Number
    },
    elementos_c: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'MateriasPrimas'
    }],
    cantidad_c:{
        type: Array
    },
    precios_c:{
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