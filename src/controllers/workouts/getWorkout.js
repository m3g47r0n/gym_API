const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getWorkoutById = async (id) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();
        
        const [workouts] = await connection.query(`
        SELECT * FROM workouts WHERE id = ?
        `, [id], 
        );

        // Comprueba si el entrenamiento existe en la base de datos.
        if (workouts.length === 0) {
            throw generateError('Lo siento, el entrenamiento no existe :(', 404);
        }

        // Retornamos el entrenamiento deseado por su id
        return workouts[0];

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

const getWorkout = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Llamamos al entrenamiento por su id
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