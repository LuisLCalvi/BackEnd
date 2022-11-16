module.exports = {
    PORT: process.env.PORT || 8080,
    mongoLocal: {
        client: 'mongodb',
        cxnStr: 'mongodb://localhost27017/'
    },
    mongoRemote: {
        cliente: 'mongodb',
        cxnStr: 'mongodb+srv://LautaroC:Lautaro2022@cluster0.t0dklcq.mongodb.net/?retryWrites=true&w=majority',
    }
}