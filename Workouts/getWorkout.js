const db = require('../../db/db');
const { generateError } = require('../../helpers');

const getWorkout = async (req, res, next) => {
    let connection;

    try {
        connection = await db();

        const { workoutId } = req.params;
        console.log(workoutId)

        const [workout] = await connection.query(
            `SELECT * FROM workouts where id = ?`,
            [workoutId]
        );

        // Comprueba si el entrenamiento existe en la base de datos.
        if (workout.length < 1) {
            throw generateError('Lo siento, el entrenamiento no existe :(', 404);
        }
        // Crea un objeto con los datos del entrenamiento.
        const workoutInf = {
            id: workout[0].id,
            name: workout[0].name,
            description: workout[0].description,
            goals: workout[0].goalsId,
            picture: workout[0].picture
        };

        res.send({
            status: 'Ok',
            data: workoutInf,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};


//Objetivos
const getGoals = async (req, res, next) => {
    let connection;

    try {
        connection = await db();

        const { goals } = req.params;
        console.log(goals)

        const [listGoals] = await connection.query(
            `SELECT e.name, e.id, e.goalsId, COUNT(f.id) AS n_favourites FROM favourites f RIGHT JOIN exercises e ON e.id=f.exercisesId WHERE goalsId = ? GROUP BY e.id ORDER BY n_favourites DESC;`,
            [goals]
        );

        if (listGoals.length < 1) {
            throw generateError('Lo siento, no hay ejercicios para el objetivo seleccionado :(', 404);
        }

        res.send({
            status: 'Ok',
            data: listGoals,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};


//grupo de músculos
const getMuscleGroup = async (req, res, next) => {
    let connection;

    try {
        connection = await db();

        const { muscleGroup } = req.params;
        console.log(muscleGroup)

        const [listMuscleGroup] = await connection.query(
            `SELECT e.name, e.id, e.muscleGroupId, COUNT(f.id) AS n_favourites FROM favourites f RIGHT JOIN exercises e ON e.id=f.exercisesId WHERE muscleGroupId = ? GROUP BY e.id ORDER BY n_favourites DESC;`,
            [muscleGroup]
        );

        if (listMuscleGroup.length < 1) {
            throw generateError('Lo siento, el grupo muscular no tiene ningún entrenamiento asignado :(', 404);
        }

        res.send({
            status: 'Ok',
            data: listMuscleGroup,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};


module.exports = {
    getWorkout,
    getGoals,
    getMuscleGroup,
};