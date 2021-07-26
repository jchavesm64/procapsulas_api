const { gql } = require('apollo-server-express');

const shared = gql`
    enum Estado{
        ACTIVO
        INACTIVO
    }

    enum Moneda{
        US_DOLLAR
        COLON
        YEN
    }

    type Email{
        email: String
    }

    type Telefono{
        telefono: String
    }

    input EmailInput{
        email: String
    }

    input TelefonoInput{
        telefono: String
    }

    type MateriaPrimaMovimientos{
        materia_prima: MateriaPrima
        movimientos: [MovimientosType]
    }
`;

module.exports = shared;