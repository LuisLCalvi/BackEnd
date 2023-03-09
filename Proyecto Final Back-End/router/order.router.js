const express = require('express')
const Order = require('../DAOs/order.daos')
const router = express.Router();
const order = new Order()

router.get('/',async (req, res) => {
    const response = await order.getAll();
    res.send(response)
});
router.post('/', async (req,res)=>{
    const response = await order.createOrder();
    res.send(response)})

router.post('/:id/cart/:idCart', async (req,res)=>{
    const response = await order.addCartToOrder(req.params.idCart, req.params.id);
    res.send(response)})

    module.exports = router