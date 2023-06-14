const { generateError } = require('../../helpers');
const { getConnection } = require('../../database/db');

const workoutChanges = async (id, name, description, goalsId, muscleGroupId) => {
    let connection;
    try {
        // Conectamos a la base de datos
        connection = await getConnection();

        const [ workouts ] = await connection.query(`
        SELECT name FROM workouts WHERE id = ?
        `, [id]
        );

        if (workouts.length === 0) {
            throw generateError('No existen workouts con ese id', 404);
        }

        const workout = await connection.query(`
        UPDATE workouts SET name = (?),
        description = (?),
        goalsId = (?),
        muscleGroupId =(?) WHERE id = ?
        `, [name, description, goalsId, muscleGroupId, id] )

        return workout;
    } finally {
        if (connection) connection.release();
    }
};

const modifyWorkout = async (req, res, next) => {
    try {
        const { name, description, goalsId, muscleGroupId } = req.body;

        if (!req.workoutId) {
            throw generateError('No se encuentra entrenamiento con ese id', 400);
        }

        await workoutChanges(req.workoutId, name, description, goalsId, muscleGroupId);

        res.send({
            status: 'ok',
            message: 'Entrenamiento modificado'
        });

    } catch (err) {
    next(err);
    }
};
    
module.exports = {
    modifyWorkout
};