const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getMuscleGroup = async () => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();
        
        const [ muscles ] = await connection.query(`
        SELECT name FROM muscleGroup
        `);

        // Comprueba si el grupo muscular existe en la base de datos
        if (!muscles) {
            throw generateError('No existe ningún entrenamiento aún :(.', 404);
        }

        // Retornamos los grupos musculares
        return muscles;

    } finally {
        if (connection) connection.release();
    }
};

const getAllMuscles = async (req, res, next) => {
    try {
        const muscles = await getMuscleGroup();
        res.send({
            status: 'Ok',
            data: muscles,
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllMuscles
};