const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string()
  .required()
  .messages({
    'string.empty': `Introduce un nombre.`,
    'any.required': `Se requiere de un nombre`
  })
});