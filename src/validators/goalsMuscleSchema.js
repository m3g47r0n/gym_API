const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string()
  .required()
  .messages({
    'string.empty': `Introduce un nombre.`,
    'any.required': `Se requiere de un nombre`
  }),

  idUser: Joi.number()
  .required()
  .messages({
    'string.empty': `Introduce id de usuario.`,
    'any.required': `Se requiere de un usuario para seguir`
  })
  
});