const db = require('../../database/db');
const { generateError } = require('../../helpers');

const getWorkout = async (req, res, next) => {
    let connection;

    try {
        connection = await db();

        const { workoutId } = req.params;
        console.log(workoutId)

        const [workout] = await connection.query(
            `SELECT * FROM workouts where id = ?`,
            [workoutId]
        );

        // Comprueba si el entrenamiento existe en la base de datos.
        if (workout.length < 1) {
            throw generateError('Lo siento, el entrenamiento no existe :(', 404);
        }
        // Crea un objeto con los datos del entrenamiento.
        const workoutInf = {
            id: workout[0].id,
            name: workout[0].name,
            description: workout[0].description,
            goals: workout[0].goalsId,
            picture: workout[0].picture
        };

        res.send({
            status: 'Ok',
            data: workoutInf,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    getWorkout
};