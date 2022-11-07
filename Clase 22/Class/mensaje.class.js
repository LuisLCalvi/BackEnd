 class Mensajes {
    constructor(table){
        this.url = "mongodb+srv://LautaroC:Lautaro2022@cluster0.t0dklcq.mongodb.net/?retryWrites=true&w=majority";
        this.mongodb = mongoose.connect
        this.mongodb(this.url)
        this.table = table;
    }

    async getAll(){
        try{
            return await this.url.from(this.table).select("*")
        }catch(err){
            throw err
        }
    }

    async addMessage(message){
        try{
            return await this.url.from(this.table).insert(message)
        }catch(err){
            throw err
        }

    }

}

module.exports = Mensajes;
