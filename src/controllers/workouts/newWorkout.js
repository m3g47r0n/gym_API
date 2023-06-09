const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const addWorkout = async (name, description, goalsId, exercisesId) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [ workout ] = await connection.query(`
        SELECT * FROM workouts WHERE name = ?
        `, [name]
        );

        if (workout.length > 0) {
            throw generateError('Lo siento, ya existe un entrenamiento con el mismo nombre :(', 409)
        }

        const [newWorkouts] = await connection.query(`
        INSERT INTO workouts (name, description, goalsId, exercisesId, createdAt) VALUES (?, ?, ?, ?, ?)
        `, [name, description, goalsId, exercisesId, new Date()]
        );

        return newWorkouts.insertId;
        
    } finally {
        if (connection) connection.release();
    }
};

const newWorkout = async (req, res, next) => {
    try {
        const { name, description, goalsId, exercisesId} = req.body;

        const id = await addWorkout(name, description, goalsId, exercisesId);

        res.send({
            status: 'ok',
            message: `Entrenamiento creado con id: ${id}`
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    newWorkout
};