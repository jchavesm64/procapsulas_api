const { gql } = require('apollo-server-express');

const shared = gql`
    enum Estado{
        ACTIVO
        INACTIVO
    }

    type Email{
        email: String
    }

    type RedSocial{
        red: String
        enlace: String
    }

    type Telefono{
        telefono: String
    }

    input EmailInput{
        email: String
    }

    input RedSocialInput{
        red: String
        enlace: String
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