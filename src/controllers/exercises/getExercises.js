const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getExerciseById = async (id) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [exercises] = await connection.query(`
        SELECT * FROM exercises WHERE id = ?
        `, [id],
        );

        // Comprueba si el ejercicio existe en la base de datos.
        if (exercises.length === 0) {
            throw generateError('Lo siento, el ejercicio no existe :(', 404);
        }
        
        //Devuelve ejercicio por su id
        return exercises[0];

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    } 
};

//Nuevo ejercicio por añadir
const getExercise = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Llamamos al ejercicio por su id
        const exercise = await getExerciseById(id);

        res.send({
            status: 'ok',
            data: exercise,
        });

    } catch(error) {
            next(error);
    }
};

module.exports = {
    getExerciseById,
    getExercise
};