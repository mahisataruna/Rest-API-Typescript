import Joi from 'joi'

interface ProductInterface {
  name: String
  price: Number
  desc: String
}

export const createProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    desc: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}
