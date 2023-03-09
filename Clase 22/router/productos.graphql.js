const express = require ('express')
const myConnectionFactory = require('../DAOs/factory.daos')


const router = express.Router();
const connection = new myConnectionFactory()


const product = connection


const getProductByIdGraph = async ({ id }) => {
	try {
	  const producto = await product.getById(id);
	  if (!producto) throw new Error("producto no encontrado");
	  return {
		id: producto._id,
		title: producto.title,
		price: producto.price,
		thumbnail: producto.thumbnail,
	  };
	} catch (error) {
	  throw new Error("error producto get by Id");
	}
  };

  const getProductsGraph = async () => {
	try {
	  const productos = await product.getAll();
	  if (!productos) throw new Error("no hay productos");
  
	  return productos.map((x) => ({
		id: x._id,
		title: x.title,
		price: x.price,
		thumbnail: x.thumbnail,
	  }));
	} catch (error) {
	  throw new Error("error producto getAll");
	}
  };
  
  const createProductGraph = async ({ datos }) => {
	try {
	  const producto = await product.save(datos);
	  if (!producto) throw new Error("no se pudo registrar el producto");
	  return {
		id: producto._id,
		title: producto.title,
		price: producto.price,
		thumbnail: producto.thumbnail,
	  };
	} catch (error) {
	  throw new Error("error producto create");
	}
  };
  
  const updateProductGraph = async ({ id, datos }) => {
	try {
	  const producto = await product.update(id, datos);
	  if (!producto) throw new Error("no se pudo actualizar el producto");
	  return {
		id: producto._id,
		title: producto.title,
		price: producto.price,
		thumbnail: producto.thumbnail,
	  };
	} catch (error) {
	  throw new Error("error producto update");
	}
  };
  
  const deleteProductGraph = async ({ id }) => {
	try {
	  const producto = await product.deleteById(id);
	  if (!producto) throw new Error("producto no encontrado");
	  return {
		id: producto._id,
		title: producto.title,
		price: producto.price,
		thumbnail: producto.thumbnail,
	  };
	} catch (error) {
	  throw new Error("error producto delete");
	}
  };


module.exports = {
    getProductByIdGraph,
  getProductsGraph,
  createProductGraph,
  updateProductGraph,
  deleteProductGraph,
}