const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
    tipo: {
        type: String,
        require: true,
        trim: true
    },
    permisos: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'permisos'
    }],
    acciones: {
        type: Array,
        require: true,
        trim: true
    },
    estado: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('roles', RolSchema);