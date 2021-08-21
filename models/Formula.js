const mongoose = require('mongoose');

const FormulaSchema = new mongoose.Schema({
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
    cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientes'
    },
    estado:{
        type: String,
        require: true,
        trim: true,
    }
})

module.exports = mongoose.model('formulas', FormulaSchema);