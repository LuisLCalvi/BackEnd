const mongoose = require("mongoose");
const messageModel = require("../models/mensaje.models")
const util = require ("util")

require('dotenv').config()

const credencial = process.env.CREDENCIAL


 class Message{
    constructor(){
        this.url = credencial;
        this.mongodb = mongoose.connect
        this.mongodb(this.url)
    }

    async save(msg){
        try{ await this.mongodb(this.url)
        const result = await msg.save();
    return result;
    }catch(err){
        console.log("se produjo un error")
    }
    }

    async createData (msg){
            try {
                await this.mongodb(this.url)
                const newMessage = await this.save(
                    new messageModel({
                        author: {
                            email: msg.email,
                            nombre: msg.nombre,
                            apellido: msg.apellido,
                            edad: msg.edad,
                            alias: msg.alias,
                            avatar: msg.avatar,
                        },
                        text: msg.message,
                    })
                );
                return newMessage;
    
            } catch (err) {
                return err;
            }
            }
        


    async getAll(){
        try{
            await this.mongodb(this.url)
            return await messageModel.find();
        }catch (error){
            console.log("se produjo un error")
        }
    }

    async addMessage(newMessage){
        try{
            return await this.url.from(this.save).insert(newMessage)
        }catch(err){
            throw err
        }

    }

   


   static returnSingleton(){
        if(!this.instance){
            this.instance = new Message()
        }
        return this.instance
    }
}


module.exports = Message;
