const { getConnection } = require('../../database/db');
const { generateError } = require('../../helpers');

const getWorkoutById = async (id) => {
    let connection;
    try {
        connection = await getConnection();
        const [workouts] = await connection.query(`
        SELECT id, name, description FROM workouts WHERE id = ?
        `, [id], 
        );

        // Comprueba si el entrenamiento existe en la base de datos.
        if (workouts.length != id) {
            throw generateError('Lo siento, el entrenamiento no existe :(', 404);
        }

        return workouts[0];
    } finally {
        if (connection) connection.release();
    }
};

const getWorkout = async (req, res, next) => {
    try {
        const { id } = req.params;
        const workout = await getWorkoutById(id);
        res.send({
            status: 'Ok',
            data: workout,
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getWorkout
};