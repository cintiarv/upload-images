import express from 'express'
import jwt_decode from 'jwt-decode'
import * as productUseCase from '../useCases/products.use.js'
const router = express.Router()

// GET /Products
router.get('/', async (request, response, next) => {
  try {
    const allProducts = await productUseCase.getAll()

    response.json({
      success: true,
      message: 'All products',
      data: {
        products: allProducts
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// GET /Products by Id
router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const getProduct = await productUseCase.getById(id)
    response.json({
      success: true,
      message: 'Post found',
      data: {
        post: getProduct
      }
    })
  } catch (error) {
    next(error)
  }
})

// POST /Products
router.post('/', async (request, response, next) => {
  try {
    const { body: product } = request
    const token = request.headers.authorization
    const { id } = jwt_decode(token)
    console.log(id)
    const newProduct = await productUseCase.addProduct(product, id)

    console.log(newProduct)
    response.json({
      success: true,
      message: 'Product published',
      data: newProduct
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// DELETE /Products
router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const productDeleted = await productUseCase.deleteById(id)
    response.json({
      success: true,
      message: 'Product deleted'
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// EDIT /Products
router.patch('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const unupdateProduct = request.body
    const productUpdated = await productUseCase.update(id, unupdateProduct)

    response.json({
      success: true,
      message: 'Product updated',
      data: {
        product: productUpdated
      }
    })
  } catch (error) {
    next(error)
  }
})
export default router
