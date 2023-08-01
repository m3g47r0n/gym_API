const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const deleteExerciseById = async (id) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [exercise] = await connection.query(`
        SELECT * FROM exercises WHERE id = ?
        `, [id]
        );

        //Comprueba si el ejercicio existe
        if (exercise.length < 1) {
            throw generateError('Lo siento, el ejercicio no existe :(', 404);
        }

        //Elimina el ejercicio de la base de datos
        const [ deleteExercise ] = await connection.query(`
        DELETE FROM exercises WHERE id = ?
        `, [id]
        );
        
        //Devuelve ejercicio ya eliminado
        return deleteExercise;

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

//Ejercicio eliminado
const deleteExercise = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Eliminamos el ejercicio seleccionado por su id
        await deleteExerciseById(id);

        res.send({
            status: 'ok',
            message: 'Ejercicio eliminado'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    deleteExercise
};