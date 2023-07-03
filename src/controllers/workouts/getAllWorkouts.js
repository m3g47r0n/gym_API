const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getWorkouts = async () => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();
        
        const [ workouts ] = await connection.query(`
        SELECT * FROM workouts
        `);

        // Comprueba si el entrenamiento existe en la base de datos.
        if (!workouts) {
            throw generateError('No existe ningún entrenamiento aún :(.', 404);
        }

        // Retornamos los entrenamientos
        return workouts;

    } finally {
        if (connection) connection.release();
    }
};

const getAllWorkouts = async (req, res, next) => {
    try {
        const workout = await getWorkouts();
        res.send({
            status: 'Ok',
            data: workout,
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllWorkouts
};