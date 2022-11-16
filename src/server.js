import express from 'express'
import productsRouter from '../src/routers/products.router.js'

const server = express()

server.use(express.json())


server.use('/products', productsRouter)

export { server }
