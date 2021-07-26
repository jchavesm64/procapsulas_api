const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
    empresa:{
        type: String,
        require: true,
        trim: true,
    },
    cedula:{
        type: String,
        require: true,
        trim: true,
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
    provedurias: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'tipoProveduria'
    }],
    estado:{
        type: String,
        require: true,
        trim: true,
    }
});

module.exports = mongoose.model('proveedores',ProveedorSchema);