const express = require ('express')
const Producto = require('../DAOs/productos.daos')

const router = express.Router();


const product = new Producto()

function validAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("usted no tiene acceso");
	}
}



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

router.get("/categoria", async (req, res) => {
	const response = await product.getAll();

	function generarCategoria({ category}) {
		return `${category}`;
	  }
	
	const categoria = response.map(generarCategoria)
	res.send(categoria)

});


router.get("/:id", async (req, res) => {
	const cont = await product.getById(req.params.id);
	res.send(cont);
});


router.put('/:id', validAdmin, async (req, res) => {
    const response = await product.put(req.params.id, req.body);
    res.json(response)
})



module.exports = router;