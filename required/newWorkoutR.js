const joi = require('joi');

const newWorkoutR = joi.object().keys({
    name: joi.string()
    .required()
    .min(2)
    .max(50)
    .regex(/[A-Za-z0-9]/)
    .error((errors)=>{
        if(
            errors[0].code === 'any.required' || errors[0].code === 'string.empty'
        ) {
            return new Error ('El nombre del entrenamiento es obligatorio.')
        }
        return new Error ('Debe tener entre 2 y 50 caractéres.');
    }),

    description: joi.string()
    .required()
    .min(10)
    .max(140)
    .error((errors)=>{
        if(
            errors[0].code === 'any.required' || errors[0].code === 'string.empty'
        ) {
            return new Error ('Es necesaria una descripción del entrenamiento.')
        }
        return new Error ('La descripcion debe de tener entre 10 y 140 caractéres.');
    }),

    muscleGroupID: joi.string()
    .required()
    .error((errors)=>{
        if(
            errors[0].code === 'any.required' || errors[0].code === 'string.empty'
        ) {
            return new Error ('Es necesario especificar el grupo muscular')
        }
    }),

    picture: joi.string()


});

module.exports = {
    newWorkoutR
};