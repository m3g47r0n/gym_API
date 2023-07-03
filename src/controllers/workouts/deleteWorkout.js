const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const deleteWorkoutById = async (workoutId) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [workout] = await connection.query(`
        SELECT * FROM workouts WHERE id = ?
        `, [workoutId]
        );

        // Comprueba que el ejercicio existe.
        if (workout.length < 1) {
            throw generateError('Lo siento, el entrenamiento no existe :(', 404);
        }
        
        // Elimina el entrenamiento.
        const [ deleteWorkout ] = await connection.query(`
        DELETE FROM workouts WHERE id = ?
        `, [workoutId]
        );

        //Devuelve entrenamiento ya eliminado.
        return deleteWorkout;

    } finally {
        //Si existe conexión, se libera.
        if (connection) connection.release();
    }
};

//Entrenamiento eliminado
const deleteWorkout = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Eliminamos el entrenamiento seleccionado por su id
        await deleteWorkoutById(id);

        res.send({
            status: 'ok',
            message: 'Entrenamiento eliminado'
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    deleteWorkout
};