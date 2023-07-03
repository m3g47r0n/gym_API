const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getExercises = async () => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();
        
        const [ exercises ] = await connection.query(`
        SELECT * FROM exercises
        `);

        // Comprueba si el grupo muscular existe en la base de datos
        if (!exercises) {
            throw generateError('No existe ningún ejercicio aún :(.', 404);
        }

        // Retornamos los grupos musculares
        return exercises;

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

//Devuelve todos los ejercicios existentes
const getAllExercises = async (req, res, next) => {
    try {
        //Llamamos a los ejercicio en nuestra base de datos
        const exercises = await getExercises();
        
        res.send({
            status: 'Ok',
            data: exercises,
        });

    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllExercises
};