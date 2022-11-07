const express = require ('express')
const Producto = require ('../DAOs/productos.daos')
const { faker } = require("@faker-js/faker");
const producto = new Producto();
const prodRouter = express.Router();

prodRouter.post("/api/productos-test", async (req, res) => {
    let response = [];
    for (let index = 0; index <= 5; index++) {
        response.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.image()
        });
    }
    res.json(response);
});

module.exports = prodRouter;
