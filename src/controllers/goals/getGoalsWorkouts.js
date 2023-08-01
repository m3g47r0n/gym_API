const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

//Objetivos
const getWorkoutsByGoals = async (id) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [listGoals] = await connection.query(`
        SELECT * FROM workouts e WHERE goalsId = ?
        `, [id]
        );

        // Comprueba si el ejercicio existe en la base de datos.
        if (listGoals.length < 1) {
            throw generateError('Lo siento, no hay entrenamientos para el objetivo seleccionado :(', 404);
        }

        //Devuelve ejercicio por su id
        return listGoals[0];

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

const getWorkoutGoals = async (req, res, next) => {
    try {
        const { id } = req.params;
        const workouts = await getWorkoutsByGoals(id)

        res.send({
            status: 'ok',
            data: workouts
        });

    } catch (error){
        next(error);
    }
};

module.exports = {
    getWorkoutGoals
}