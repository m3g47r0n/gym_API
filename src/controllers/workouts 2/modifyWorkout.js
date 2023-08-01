const { generateError } = require('../../middleware/helpers');
const { getConnection } = require('../../database/db');

const workoutChanges = async (name, description, goalsId, exercisesId, id) => {
    let connection;
    try {
        // Conectamos a la base de datos
        connection = await getConnection();

        //Modifica entrenamiento en la base de datos
        const [ workoutChanged ] = await connection.query(`
        UPDATE workouts SET name = ?,
        description = ?,
        goalsId = ?,
        exercisesId = ?,
        modifiedAt = ? WHERE id = ?
        `, [name, description, goalsId, exercisesId, new Date(), id]);

        if (id.length === 0) {
            throw generateError('No existen workouts con ese id.', 404);
        }

        return workoutChanged;

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

const modifyWorkout = async (req, res, next) => {
    try {
        const { name, description, goalsId, exercisesId } = req.body;

        await workoutChanges(name, description, goalsId, exercisesId);

        res.send({
            status: 'ok',
            message: 'Entrenamiento modificado!'
        });

    } catch (err) {
    next(err);
    }
};
    
module.exports = {
    modifyWorkout
};