import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
})

const Product = mongoose.model('products', productSchema)
export { Product }
