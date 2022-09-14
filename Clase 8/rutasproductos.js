const { Router } = require (`express`)
const router = Router();
const Contenedor = require (`../Clase 8/contenedor`);

router.get(`/`, async (req, res) =>{
    Contenedor.getAll().then(resultado =>res.json(resultado))
})

router.get(`/:id`, (req, res)=>{
    const id = Number(req.params.id)
    Contenedor.getById(id).then (i => res.status(200).json(i))

})

router.post(`/`, (req,res)=>{
    const { title, price, img } =req.body
    Contenedor.postProductos ({title, price, img }).then(i => res.send ({mensaje: `el id del nuevo producto es ${i.id}`}))
})

router.put (`/:id`, (req, res) =>{
    const {title, price, img } = req.body
    const id = Number(req.params.id)
    Contenedor.putProductos(id, {title, price, img }).then(i => res.json(i))
})

router.delete(`/:id`, (req, res)=>{
    const id = Number(req.params.id)
    Contenedor.deleteById(id).then(i => res.json(i))
})


module.exports = router