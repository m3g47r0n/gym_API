const { getConnection } = require('../../database/db');
const { generateError } = require('../../helpers');

const addExercises = async (name, description, picture, goalsId, muscleGroupId) => {
    let connection;
    try {
        connection = await getConnection();

       /* if (!req.files || !req.files.picture) {
            throw generateError(
                'Indique una foto, por favor.',
                400
            );
        }

        const pictureName = await savePicture(req.files.picture);
        console.log(pictureName)

        */

        const [exercise] = await connection.query(
            `SELECT * FROM exercises WHERE name = ?`,
            [name]
        );

        if (exercise.length > 0) {
            throw generateError(
                'Lo siento, ya existe un ejercicio con el mismo nombre :(',
                409
            );
        }

        const [newExercise] = await connection.query(
            `INSERT INTO exercises (name, description, picture, goalsId, muscleGroupId, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, description, picture, goalsId, muscleGroupId, new Date()]
        );

        return newExercise.insertId;
    } finally {
        if (connection) connection.release();
    }
};

const newExercises = async (req, res, next) => {
    let connection;

    try {
        const { name, description, picture, goalsId, muscleGroupId } = req.body;

        if (!name || !description || !picture || !goalsId || !muscleGroupId) {
            throw generateError('Introduce todos los campos', 400);
        }

        const id = await addExercises(name, description, goalsId, muscleGroupId);

        res.send({
            status: 'ok',
            message: `Ejercicio creado con id: ${id}`
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    newExercises,
};