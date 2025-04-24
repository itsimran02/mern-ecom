import Joi from "joi";

const productSchemaValidator = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().min(2).required(),
  subCategory: Joi.string().optional(),
  brand: Joi.string().required(),
  colors: Joi.array().items(Joi.string().optional()),
  sizes: Joi.array().items(Joi.string().optional()),
  images: Joi.array().items(Joi.string().optional()),
  inStock: Joi.boolean().truthy("true").falsy("false"),
});

export default productSchemaValidator;
