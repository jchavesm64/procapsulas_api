const mongoose = require('mongoose');

const TipoProveduriaSchema = new mongoose.Schema({
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

module.exports = mongoose.model('tipoProveduria', TipoProveduriaSchema);