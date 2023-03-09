const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema({
    author: {
        email: { type: String, require: true },
        timeStamp: { type: Date, default: Date.now },
      },
      text: { type: String },


})

const ChatModel = mongoose.model('message', chatSchema);

module.exports =  ChatModel