const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string()
  .required()
  .messages({
    'string.empty': `Introduce tu nombre.`,
    'any.required': `Se requiere de un nombre`
  }),
  
  email: Joi.string()
  .email()
  .required()
  .messages({
    'string.empty': `Introduce tu email.`,
    'any.required': `Se requiere de un email`
  }),

  password: Joi.string()
  .required()
  .messages({
    'string.empty': `Introduce una contraseña.`,
    'any.required': `Se requiere de una contraseña.`
  })
});
