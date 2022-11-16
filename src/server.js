import express from 'express'
import productsRouter from '../src/routers/products.router.js'
import handleErrors from './middlewares/handleError.js'
import cors from 'cors'

const server = express()

server.use(express.json())


server.use('/products', productsRouter)
server.use(cors())

export { server }
server.use(handleErrors)
