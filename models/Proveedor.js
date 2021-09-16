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
    city:{
        type:String,
        trim: true
    },
    calle:{
        type:String,
        trim: true
    },
    cp:{
        type:String,
        trim: true
    },
    direccion:{
        type: String,
        require: true,
        trim: true,
    },
    telefonos:{
        type: Array,
        trim: true
    },
    correos:{
        type: Array,
        trim: true
    },
    redes:{
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