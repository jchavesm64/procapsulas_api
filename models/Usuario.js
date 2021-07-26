const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true,
    },
    cedula:{
        type: String,
        require: true,
        trim: true
    },
    clave: {
        type: String,
        require: true,
    },
    correos: {
        type: Array,
        require: true,
        trim: true
    },
    telefonos: {
        type: Array,
        require: true,
        trim: true
    },
    roles: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'roles'
    }],
    estado:{
        type: String,
        require: true,
        trim: true,
    }
});

module.exports = mongoose.model('usuarios', UsuarioSchema);