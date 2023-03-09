const express = require('express')
const Chat = require('../DAOs/chat.daos')
const routerChat = express.Router();
const chat = new Chat()


routerChat.get('/', async (req,res) =>{
    const chats = await chat.getAll();
    res.send(chats)})

routerChat.get('/:email', async (req,res,next)=>{
    try {
        if(req.params.email === undefined || req.params.email === null){
            res.status(400).json({error: 'parametro incorrecto'})
        }
        const response = await chat.getByMail(req.params.email);
        res.status(200).json(response ?? { error: 'usuario no encontrado'})
    } catch (error) {
        next(error)
    }
})
routerChat.post('/', async(req,res)=>{
    const response = await chat.saveMsg(req.body)
    res.send(response)
})

module.exports = routerChat