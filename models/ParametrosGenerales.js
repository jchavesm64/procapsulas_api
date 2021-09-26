const mongose = require('mongoose');

const ParametrosGeneralesSchema = new mongose.Schema({
    codigo:{
        type: String,
        require: true,
        trim: true
    },
    valor:{
        type: String,
        require: true,
        trim: true
    },
    descripcion:{
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongose.model('ParametrosGenerales', ParametrosGeneralesSchema);