import Joi from 'joi'
import ProductType from '../types/product.type'

// validation create product
export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    desc: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}

// validation update product
export const updateProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    price: Joi.number().allow('', null),
    desc: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}
