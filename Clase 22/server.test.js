		
const {expect} = require('from')
const axios = require ('axios')
const {it} = require('mocha')

		describe('verificando endpoints de api productos', () =>{
		it('validando codigo 200 GET /api/productos', async ()=>{
		const products = await axios.get('http://localhost:8080/api/productos')
		expect(products.status).to.eql(200)
		})
		

		it('validando estructura de datos GET /api/productos', async ()=>{
		const products = await axios.get('http://localhost:8080/api/productos')
		expect(products.data[0]).to.include.keys('_id', 'price', 'title')
		})
		

		it('validando ingreso de producto nuevo POST /api/productos', async ()=>{
		const newProduct = {
		'title': 'Mango',
		'price': '50',
		'thumbnail': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mango_-_single.jpg/1200px-Mango_-_single.jpg',
		'stock': 10
		}
		const product = await axios.post('http://localhost:8080/api/productos/?admin=true', newProduct)
		expect(product.data).to.include.keys('_id', 'title')
		expect(product.data.title).to.eql(newProduct.title)
		})
		

		it('validando ingreso correcto de estructura de producto nuevo POST /api/productos', async ()=>{
		const newProduct = {
		'title': 'uva',
		'stock': 100,
        'thumbnail':  'https://fundaciondelcorazon.com/images/stories/corazon-facil/impulso-vital/uvas.jpg'
		}
		const product = await axios.post('http://localhost:8080/api/productos/?admin=true', newProduct)
		expect(product.data._message).to.eql('product validation failed')
		})
		})

