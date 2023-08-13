const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getFavoritedWorkouts = async (req, res, next) => {
    try {
        const userId = req.authUser.id;

        // Realiza la consulta para obtener los entrenamientos que el usuario ha marcado como favoritos
        const connection = await getConnection();
        const [favoritedWorkouts] = await connection.query(`
            SELECT w.* FROM workouts w
            INNER JOIN favorites f ON w.id = f.workoutsId
            WHERE f.userId = ?
        `, [userId]);

        res.send({
            status: 'ok',
            favoritedWorkouts
        });
    } catch (error) {
        console.error(error);
        next(generateError('Error al obtener los entrenamientos marcados como favoritos', 500));
    }
};

module.exports = {
    getFavoritedWorkouts
};
