import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  // Pesan error jika required tidak terpenuhi
  if (error) {
    logger.error('ERR: product - create = ', error.details[0].message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }
  logger.info('Success add new product data')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Add product success',
    data: value
  })
}

export const getProduct = (req: Request, res: Response) => {
  const products = [
    { name: 'Kain Songket', price: 270000, desc: 'Kain songkat karya anak bangsa' },
    { name: 'Kain Tenun', price: 290000, desc: 'Kain tenun karya anak bangsa' }
  ]
  const {
    params: { name }
  } = req
  //   Buat filter datanya
  if (name) {
    const filterProduct = products.filter((product) => {
      if (product.name === name) {
        return product
      }
    })
    if (filterProduct.length === 0) {
      logger.info('Product not found')
      return res.status(404).send({
        status: false,
        statusCode: 404,
        data: {}
      })
    }
    logger.info('Success get product data')
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data: filterProduct[0]
    })
  }
  logger.info('Success get product data')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: products
  })
}
