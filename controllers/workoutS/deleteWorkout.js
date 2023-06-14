const db = require('../../database/db');
const { generateError } = require('../../helpers');

const deleteWorkout = async (req, res, next) => {
    let connection;

    try {
        connection = await db();

        const { workoutId } = req.params;

        // Comprueba que el ejercicio existe.
        const [workout] = await connection.query(
            `SELECT * FROM workout WHERE id = ?`,
            [workoutId]
        );

        if (workout.length < 1) {
            throw generateError('Lo siento, el entrenamiento no existe :(', 404);
        }
        
        // Elimina el entrenamiento.
        await connection.query(`DELETE FROM workouts WHERE id = ?`, [
            workoutId,
        ]);

        res.send({
            status: 'Ok',
            message: 'El entrenamiento ha sido eliminado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    deleteWorkout
};