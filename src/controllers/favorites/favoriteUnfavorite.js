const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const favoriteUnfavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.authUser.id; // Obtiene el userId del token de autenticación

        // Ejecuta la función workoutFavorite y obtiene el estado de favorito actualizado
        const isFavorite = await workoutFavorite(id, userId); // Pasamos también el userId

        res.send({
            status: 'ok',
            message: isFavorite ? 'Entrenamiento marcado como favorito' : 'Entrenamiento eliminado de favoritos',
            isFavorite: isFavorite ? 1 : 0
        });

    } catch (error) {
        next(error);
    }
};

const workoutFavorite = async (id, userId) => {
    let connection;
    try {
        // Conexión con la base de datos
        connection = await getConnection();

        const [favorite] = await connection.query(`
        SELECT * FROM favorites WHERE workoutsId = ? AND userId = ? 
        `, [id, userId]); // Aquí también incluimos el userId en la consulta

        // Comprueba si el entrenamiento existe en la base de datos.
        if (favorite.length === 0) {
            generateError('El entrenamiento no existe.', 404);
        }

        if (favorite.length < 1) {
            await connection.query(`
            INSERT INTO favorites (workoutsId, userId) VALUES (?, ?)  
            `, [id, userId]
            );

            return true; // Marcar como favorito

        } else {
            await connection.query(`
            DELETE FROM favorites WHERE workoutsId = ? AND userId = ?  
            `, [id, userId]
            );

            return false; // Eliminar de favoritos
        }
    } finally {
        // Si existe conexión, se libera
        if (connection) connection.release();
    }
};


module.exports = {
    favoriteUnfavorite
};
