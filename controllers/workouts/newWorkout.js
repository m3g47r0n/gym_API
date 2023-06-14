const { getConnection } = require('../../database/db');
const { generateError } = require('../../helpers');

const addWorkout = async (name, description, goalsId, muscleGroupId) => {
    let connection;
    try {
        connection = await getConnection();
        const [workout] = await connection.query(`
        SELECT * FROM workouts WHERE name = ?
        `, [name]
        );

        if (workout.length > 0) {
            throw generateError('Lo siento, ya existe un entrenamiento con el mismo nombre :(', 409)
        }

        //Error si no se introduce un nombre válido
        if (name.length < 2){
            throw generateError('Introduzca un nombre válido, por favor.', 400);
        }

        if (description.length < 10) {
            throw generateError('Sea más específico, por favor. La descripción debe contener al menos 10 caracteres.', 400)
        }

        if (workout.length > 0) {
            throw generateError('Lo siento, ya existe un entrenamiento con el mismo nombre :(', 409)
        }

        const [newWorkouts] = await connection.query(`
        INSERT INTO workouts (name, description, goalsId, muscleGroupId, createdAt) VALUES (?, ?, ?, ?, ?)
        `, [name, description, goalsId, muscleGroupId, new Date()]
        );

        return newWorkouts.insertId;
        
    } finally {
        if (connection) connection.release();
    }
};

const newWorkout = async (req, res, next) => {
    try {
        const { name, description, goalsId, muscleGroupId} = req.body;

        if (!name || !description || !goalsId || !muscleGroupId) {
            throw generateError('Introduce todos los campos', 400);
        }

        const id = await addWorkout(name, description, goalsId, muscleGroupId);

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