const mongoose = require('mongoose');

const FormulaBaseSchema = new mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    elementos:[{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'MateriasPrimas'
    }],
    estado:{
        type: String,
        require: true,
        trim: true
    }
})

module.exports = mongoose.model('FormulasBase', FormulaBaseSchema);