import { Router, Request, Response, NextFunction } from 'express'
import { createProductValidation } from '../validation/product.validation'
import { logger } from '../utils/logger'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get product data')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    data: [{ name: 'Kain Songket', price: 270000, desc: 'Koleksi terbaru dari Songket Silungkang' }]
  })
})
ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
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
})
