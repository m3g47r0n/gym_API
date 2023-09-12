const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getFavoriteWorkouts = async (req, res, next) => {
    try {
        const userId = req.authUser.id;

        // Realiza la consulta para obtener los workouts a los que el usuario ha dado favorito
        const connection = await getConnection();
        const [favoriteWorkout] = await connection.query(`
            SELECT w.* FROM workouts w
            INNER JOIN favorites f ON w.id = f.workoutsId
            WHERE f.userId = ?
        `, [userId]);

        res.send({
            status: 'ok',
            Workouts: favoriteWorkout,
        });
    } catch (error) {
        console.error(error);
        next(generateError('Error al obtener los workouts favoritos"', 500));
    }
};

module.exports = {
    getFavoriteWorkouts
};
