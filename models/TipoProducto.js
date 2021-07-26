const mongoose = require('mongoose');

const TipoProductoSchema = new mongoose.Schema({
    tipo:{
        type: String,
        require: true,
        trim: true
    },
    estado:{
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('tipoProductos', TipoProductoSchema);