const db = require('../../db/db');
const { generateError, savePicture, validate } = require('../../helpers');
const newWorkoutR = require('../../required/newWorkoutR');

const newWorkout = async (req, res, next) => {
    let connection;

    try {
        connection = await db();
        
        const idUser = req.userAuth.id

        // Obtiene los datos requeridos.
        const { name, description, goalsId, muscleGroupId } = req.body;

        if (!idUser || !name || !description || !goalsId || !muscleGroupId) {
            throw generateError('Faltan campos obligatorios.', 400);
        }

        //Valida lso datos requeridos.
        await validate(newWorkoutR, req.body)

        if (name.length < 2){
            throw generateError(
                'Introduzca un nombre con más de 2 caracteres, por favor.',
                400
            );
        }

        if (description.length < 10) {
            throw generateError(
                'Sea más específico, por favor. La descripción debe contener al menos 10 caracteres.',
                400
            );
        }

        if (!req.files || !req.files.picture) {
            throw generateError(
                'Indique una foto, por favor.',
                400
            );
        }

        const pictureName = await savePicture(req.files.picture);
        console.log(pictureName)

        const [workout] = await connection.query(
            `SELECT * FROM workouts WHERE name = ?`,
            [name]
        );

        if (workout.length > 0) {
            throw generateError(
                'Lo siento, ya existe un entrenamiento con el mismo nombre :(',
                409
            );
        }

        await connection.query(
            `INSERT INTO workouts (userId, name, description, goalsId, muscleGropuId, picture)
    VALUES (?, ?, ?, ?, ?, ?)`,
            [idUser, name, description, goalsId, muscleGroupId, pictureName]
        );

        res.send({
            status: 'Ok',
            message: 'El entrenamiento ha sido creado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};


module.exports = newWorkout;