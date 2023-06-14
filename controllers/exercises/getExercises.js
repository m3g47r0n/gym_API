const { getConnection } = require('../../database/db');
const { generateError } = require('../../helpers');

const getExercises = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

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

module.exports = {
    getExercises
};