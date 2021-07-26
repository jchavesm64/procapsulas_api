const mongose = require('mongoose');

const MovimientosSchema = new mongose.Schema({
    tipo:{
        type: String,
        require: true,
        trim: true
    },
    lote:{
        type: String,
        require: true,
        trim: true
    },
    codigo:{
        type: String,
        require: true,
        trim: true
    },
    fechaFabricacion:{
        type: Date
    },
    fechaVencimiento:{
        type: Date
    },
    fecha:{
        type: Date,
        require: true,
        trim: true
    },
    cantidad:{
        type: Number,
        require: true,
        trim: true
    },
    existencia:{
        type: Number
    },
    precio:{
        type: Number
    },
    precio_unidad:{
        type: Number
    },
    moneda:{
        type: String,
        require: true,
        trim: true
    },
    cao:{
        type: String,
    },
    usuario:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'usuarios'
    },
    materia_prima:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'MateriasPrimas'
    }
});

module.exports = mongose.model('Movimientos', MovimientosSchema);