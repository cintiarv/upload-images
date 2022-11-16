import express from 'express'
import * as productsUsesCases from '../useCases/products.use.js'
const router = express.Router()
import {StatusHttp} from '../libs/statusHttp.js'
import {upload} from '../middlewares/multer.js'

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
router.post('/', upload.single('image'), async (request, response, next) => {
  try {
      // request.file
      const {body, file} = request
      console.log(file)
      console.log(body)

      const productCreated = await productsUsesCases.addProduct(body, file)

      response.json({
          success: true,
          message: 'product created successfully - test',
          data: {
              product: productCreated
          }
      })
  } catch (error) {
      next(new StatusHttp(error.message, error.status, error.name))
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
