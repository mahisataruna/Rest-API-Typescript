import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import ProductType from '../types/product.type'

// Add product
export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload)
}

// Get Product from DB
export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Cannot get data from DB')
      logger.info(error)
    })
}

// Get ID
export const getProductById = async (id: String) => {
  return await productModel.findOne({ product_id: id })
}

// Update data product
export const updateProductById = async (id: String, payload: ProductType) => {
  const result = await productModel.findOneAndUpdate(
    {
      product_id: id
    },
    { $set: payload }
  )
  return result
}

// Delete data product
export const deleteProductById = async (id: String) => {
  const result = await productModel.findOneAndDelete({ product_id: id })
  return result
}
