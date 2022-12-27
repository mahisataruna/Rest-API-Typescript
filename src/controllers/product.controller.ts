import { Request, Response } from 'express'
import { addProductToDB, getProductById, getProductFromDB } from '../services/product.service'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'
import { v4 as uuidv4 } from 'uuid'
// import ProductType from '../types/product.type'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)
  // Pesan error jika required tidak terpenuhi
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }
  try {
    await addProductToDB(value)
    logger.info('Success add new product data')
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'Add product success'
    })
  } catch (error) {
    logger.error('ERR: product - create = ', error)
    return res.status(422).send({ status: false, statusCode: 422, message: error })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  // Buat filter get datanya
  if (id) {
    const product = await getProductById(id)
    if (product) {
      logger.info('Success get product data')
      return res.status(200).send({
        status: true,
        statusCode: 200,
        data: product
      })
    } else {
      return res.status(404).send({
        status: false,
        statusCode: 404,
        message: 'Sorry data not found',
        data: {}
      })
    }
  } else {
    const products: any = await getProductFromDB()
    logger.info('Success get product data')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: products
    })
  }
}
