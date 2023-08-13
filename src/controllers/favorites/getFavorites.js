const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getFavorites = async (req, res, next) => {
    try {
        const userId = req.authUser.id;

        // Realiza la consulta para obtener los IDs de los entrenamientos marcados como favoritos por el usuario
        const connection = await getConnection();
        const [favorites] = await connection.query(`
            SELECT workoutsId FROM favorites WHERE userId = ?
        `, [userId]);

        const favoriteWorkoutIds = favorites.map(item => item.workoutsId);

        res.send({
            status: 'ok',
            favoriteWorkoutIds
        });
    } catch (error) {
        console.error(error);
        next(generateError('Error al obtener los entrenamientos favoritos', 500));
    }
};


module.exports = {
    getFavorites
};
