const db = require('../../database/db');
const { generateError } = require('../../helpers');

const getExercises = async (req, res, next) => {
    let connection;

    try {
        connection = await db();

        const { exerciseId } = req.params;
        console.log(exerciseId)

        const [exercises] = await connection.query(
            `SELECT * FROM exercises where id = ?`,
            [exerciseId]
        );

        // Comprueba si el ejercicio existe en la base de datos.
        if (exercises.length < 1) {
            throw generateError('Lo siento, el ejercicio no existe :(', 404);
        }
        // Crea un objeto con los datos del ejercicio.
        const exerciseInf = {
            id: exercises[0].id,
            name: exercises[0].name,
            description: exercises[0].description,
            goals: exercises[0].goalsId,
            picture: exercises[0].picture
        };

        res.send({
            status: 'Ok',
            data: exerciseInf,
        });
    } catch (error) {
        next(error);
    } 
};

//Objetivos
const getListGoals = async (req, res, next) => {
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
const getListMuscleGroup = async (req, res, next) => {
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
            throw generateError('Lo siento, el grupo muscular no tiene ningún ejercicio asignado :(', 404);
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
    getExercises,
    getListGoals,
    getListMuscleGroup,
};