const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()     
    .required()
    .min(2)
    .max(50)
    .messages({
        "string.empty": `El nombre del entrenamiento es obligatorio.`,
        "any.required": `Se requiere de un nombre para el entrenamiento.`,
    }),

    description: Joi.string()
    .required()
    .min(10).max(140)
    .messages({
        "string.empty": `La descripción del entrenamiento es obligatoria.`,
        "any.required": `Se requiere de descripción para el entrenamiento.`,
    }),

    goalsId: Joi.number()
    .required()
    .messages({
        "string.empty": `El objetivo del entrenamiento es obligatorio.`,
        "any.required": `Se requiere de un objetivo para el entrenamiento.`,
    }),

    exercisesId: Joi.number()
    .required()
    .messages({
        "string.empty": `Inroducir los ejercicios del entrenamiento es obligatorio.`,
        "any.required": `Se requiere de ejercicios para el entrenamiento.`,
    }),
});