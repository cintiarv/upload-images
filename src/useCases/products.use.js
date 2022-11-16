import { StatusHttp } from '../libs/statusHttp.js'
import { Product } from '../models/products.model.js'

async function getAll () {
  return Product.find({})
}

async function getById (idProduct) {
  const productFound = await Product.findById(idProduct)
  if (!productFound) {
    throw new StatusHttp('Post not found', 400)
  }
  return Product.findById(idProduct)
}

async function addProduct (newProduct, userCurrent) {
  const productCreated = await Product.create({ ...newProduct, author: userCurrent })
  
  return productCreated
}

async function deleteById (idProduct) {
  const productFound = await Product.findById(idProduct)
  if (!productFound) {
    throw new StatusHttp('Product not found', 400)
  }
  return Product.findByIdAndDelete(idProduct)
}

async function update (idProduct, unupdatedProduct) {
  const productFound = await Product.findById(idProduct)
  if (!productFound) {
    throw new StatusHttp('product not found', 400)
  }
  return Product.findByIdAndUpdate(idProduct, unupdatedProduct, { new: true })
}

export {
  getAll,
  getById,
  addProduct,
  deleteById,
  update
}
