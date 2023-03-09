require('dotenv').config()
const mongoose = require("mongoose");
const ChatModel = require('../models/chat.models')

const credencial = process.env.CREDENCIAL

class Chat {
    constructor(){
        this.url = credencial;
        this.mongodb = mongoose.connect
        this.mongodb(this.url)
    }

    async saveMsg(data){
        try {
            await this.mongodb(this.url)
            const newMessage = await new ChatModel({
                    author: {
                        email: data.email,
                    },
                    text: data.text
                }).save()
            console.log(`newMessage ${newMessage}`)
            return await newMessage
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            await this.mongodb(this.url);
            return await ChatModel.find()
        } catch (error) {
            console.log(error)
            return { error: 'No existe historial de chat'}            
        }
    }

    async getByMail(mail){
        try {
            await this.mongodb(this.url)
            return await ChatModel.find(mail)
        } catch (error) {
            console.log(error)
            return { error: 'No se encontró historial con email proporcionado'}
        }
    }
}

module.exports = Chat