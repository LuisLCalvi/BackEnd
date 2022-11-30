
require('dotenv').config()

const credencial = process.env.CREDENCIAL



module.exports = {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cxnStr: 'mongodb://localhost27017/'
    },
    mongoRemote: {
        cliente: 'mongodb',
        cxnStr: credencial,
    }
}