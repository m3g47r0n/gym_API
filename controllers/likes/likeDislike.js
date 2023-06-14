const { getConnection } = require('../../database/db');


//Añadimos función like/dislike.
const likeDislike = async (req, res, next) => {
    let connection;
    try {
        connection = await getConnection();

        const idUser = req.userAuth.id;

        const { exercisesId } = req.params;

        const [liked] = await connection.query(`
        SELECT * FROM likes WHERE userId = ? AND exercisesId = ?
        `, [idUser, exercisesId]
        );

        if (liked.length < 1) {
            await connection.query(`
            INSERT INTO likes (exercisesId) VALUES (?, ?)
            `, [exercisesId]
            );

            const [likeCount] = await connection.query(`
            SELECT COLUNT(id) as likeCount FROM likes WHERE exercisesId = ?
            `, [exercisesId]
            );

            res.send({
                status: 'Ok',
                message: '¡Ha sido añadido a likes!',
                likeCount: likeCount[0].likes,
            });

        } else {
            await connection.query(`
            DELETE FROM likes WHERE userId = ? AND exercisesId = ?
            `, [idUser, exercisesId]
            );

            const [likeCount] = await connection.query(`
            SELECT COUNT(id) as likeCount FROM likes WHERE exercisesId=?
            `, [exercisesId]
            );

            res.send({
                status: 'Ok',
                message: 'Ha sido eliminado de likes.',
                likeCount: likeCount[0].likes,
            });
        }
        
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    likeDislike,
};