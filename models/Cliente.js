const mongoose = require('mongoose');

const ClientesSchema = new mongoose.Schema({
    tipo:{
        type: String,
        require: true,
        trim: true,
    },
    nombre:{
        type: String,
        require: true,
        trim: true,
    },
    codigo:{
        type: String,
        require: true,
        trim: true
    },
    pais:{
        type: String,
        require: true,
        trim: true,
    },
    ciudad:{
        type: String,
        require: true,
        trim: true,
    },
    direccion:{
        type: String,
        require: true,
        trim: true,
    },
    telefonos:{
        type: Array,
        require: true,
        trim: true
    },
    correos:{
        type: Array,
        require: true,
        trim: true
    },
    estado:{
        type:String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('clientes', ClientesSchema);