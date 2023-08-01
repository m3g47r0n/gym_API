const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getLikedExercises = async (req, res, next) => {
    try {
        const userId = req.authUser.id;

        // Realiza la consulta para obtener los ejercicios a los que el usuario ha dado "me gusta"
        const connection = await getConnection();
        const [likedExercises] = await connection.query(`
            SELECT e.* FROM exercises e
            INNER JOIN likes l ON e.id = l.exercisesId
            WHERE l.userId = ?
        `, [userId]);

        res.send({
            status: 'ok',
            Exercises: likedExercises,
        });
    } catch (error) {
        console.error(error);
        next(generateError('Error al obtener los ejercicios con "me gusta"', 500));
    }
};

module.exports = {
    getLikedExercises
};
