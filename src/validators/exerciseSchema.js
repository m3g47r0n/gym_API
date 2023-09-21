const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().required().min(2).max(50).messages({
    'string.empty': `Introduce tu nombre.`,
    'any.required': `Se requiere de un nombre`,
    'string.min': `El nombre debe tener un mínimo de 2 carácteres.`,
  }),

  description: Joi.string().required().min(10).max(300).messages({
    'string.empty': `Introduce una descripción.`,
    'any.required': `Se requiere de un descripción.`,
    'string.min': `La descripción debe tener un mínimo de 10 carácteres.`,
    'string.max': `La descripción debe tener un maximo de 300 carácteres.`,
  }),

  type: Joi.string().required().min(5).max(20).messages({
    'string.empty': `Introduce la tipología del ejercicio.`,
    'any.required': `Se requiere una tipología.`,
    'string.min': `La tipología debe tener un mínimo de 5 carácteres.`,
  }),

  muscleGroupId: Joi.number().required().messages({
    'string.empty': `Introduce músculo o grupo muscular.`,
    'any.required': `Se requiere de un grupo muscular`,
  }),

  picture: Joi.string(),
});
