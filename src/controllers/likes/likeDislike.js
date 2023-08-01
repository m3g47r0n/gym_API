const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const exerciseLike = async(id) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [ exercise ] = await connection.query(`
        SELECT * FROM likes WHERE exercisesId = ?
        `, [id]
        );

        // Comprueba si el ejercicio existe en la base de datos.
        if (exercise.length === 0) {
            generateError('El ejercicio no existe.', 404);
        }

        if (exercise.length < 1) {
            await connection.query(`
            INSERT INTO likes (exercisesId) VALUES (?)
            `, [id]
            );

            await connection.query(`
            SELECT COUNT(id) FROM likes WHERE exercisesId = ?
            `, [id]
            ); 

        } else {
            await connection.query(`
            DELETE FROM likes WHERE exercisesId = ?
            `, [id]
            );

            const [likeCount] = await connection.query(`
            SELECT COUNT(id) likes FROM likes WHERE exercisesId = ?
            `, [id]
            );

            return likeCount[0];
        }

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

//Like toggle
const likeDislike = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        await exerciseLike(id);

        res.send({
            status: 'ok',
            message: `Like`
        });
        
    } catch (error) {
        next(error)
    }
};

module.exports = {
    likeDislike
} 