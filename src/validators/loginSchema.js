const Joi = require("joi");

module.exports = Joi.object({
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
  }),
});
