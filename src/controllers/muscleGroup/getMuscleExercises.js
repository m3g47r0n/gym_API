const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

//Grupo Muscular
const getExercisesByMuscles = async (id) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [ exercises ] = await connection.query(`
        SELECT * FROM workouts e WHERE goalsId = ?
        `, [id]
        );

        // Comprueba si el ejercicio existe en la base de datos.
        if (exercises.length < 1) {
            throw generateError('Lo siento, no hay ejercicios para el grupo muscular seleccionado :(', 404);
        }

        //Devuelve ejercicios por su id
        return exercises;

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

const getMuscleExercises = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Llamamos al ejercicio por su id
        const exercises = await getExercisesByMuscles(id);

        res.send({
            status: 'ok',
            data: exercises
        });

    } catch (error){
        next(error);
    }
};

module.exports = {
    getMuscleExercises
}