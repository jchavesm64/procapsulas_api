const mongoose = require('mongoose');

const PermisoSchema = new mongoose.Schema({
    descripcion:{
        type: String,
        require: true,
        trim: true
    },
    estado: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('permisos', PermisoSchema);