const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getLikeCount = async (id) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [ likes ] = await connection.query(`
        SELECT COUNT(*) FROM likes WHERE exercisesId = ?
        `, [id],
        );

        // Comprueba si el ejercicio existe en la base de datos.
        if (likes.length < 1) {
            throw generateError('Lo siento, el ejercicio no tiene likes :(', 404);
        }
        
        //Devuelve ejercicio por su id
        return likes;

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    } 
};

const getLikes = async (req, res, next) => {
    try {
        const { id } = req.params;

        //Llamamos al like por su id
        const likes = await getLikeCount(id);

        res.send({
            status: 'ok',
            data: likes
        });

    } catch(error) {
        next(error);
    }
};

module.exports = {
    getLikes
};