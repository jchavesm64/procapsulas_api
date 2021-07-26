const mongoose = require('mongoose');

const FormulaSchema = new mongoose.Schema({
    tipo:{
        type: String,
        require: true,
        trim: true
    },
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    elementos:[{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'MateriasPrimas'
    }],
    porcentajes:{
        type: Array,
        require: true
    },
    formulaBase:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FormulasBase'
    },
    estado:{
        type: String,
        require: true,
        trim: true,
    }
})

module.exports = mongoose.model('formulas', FormulaSchema);