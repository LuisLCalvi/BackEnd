const express = require ('express')
const Producto = require ('../DAOs/productos.daos')

const validAdmin = require('../controllers/auth/index')

const router = express.Router();

const product = new Producto();



router.post("/", validAdmin, async (req, res) => {
	console.log(req.body);
	const response = await product.createData(req.body)
	res.send(response);
});

router.delete("/:id", validAdmin, async (req, res) => {
	const productDelete = await product.delete(req.params.id);
	res.send(productDelete);
});

router.get("/", async (req, res) => {
	const response = await product.getAll();
	res.send(response)
});

router.get("/:id", async (req, res) => {
	const cont = await product.getById(req.params.id);
	res.send(cont);
});

router.put('/:id', validAdmin, async (req, res) => {
	const id = await product.put(req.params.id, req.body);
	res.json(id);
})

module.exports = router;
