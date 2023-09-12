const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getFavoriteCount = async (id) => {
    let connection;
    try {
      //Conexión con la base de datos
        connection = await getConnection();
    
        const [favorites] = await connection.query(`
            SELECT COUNT(*) FROM favorites WHERE workoutsId = ?
        `, [id]);
    
        // Comprueba si el workout existe en la base de datos.
        if (favorites.length < 1) {
            throw generateError('Lo siento, el workout no tiene favoritos :(', 404);
        }
    
        // Devuelve el recuento de favorites
        return favorites[0]['COUNT(*)'];
        } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
        }
};
    
const getFavorites = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        //Llamamos al favorite por su id
        const favoriteCount = await getFavoriteCount(id);
    
        res.send({
            status: 'ok',
            favoriteCount: favoriteCount // Envia el recuento de favoritos al cliente
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFavorites
};
