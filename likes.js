const db = require('../database/db');


//Añadimos función like/dislike.
const likeDislike = async (req, res, next) => {
    let connection;

    try {
        connection = await db();


        const idUser = req.userAuth.id;

        const { exercisesId } = req.params;

        const [liked] = await connection.query(
            `SELECT * FROM likes WHERE userId = ? AND exercisesId = ?`,
            [idUser, exercisesId]
        );

        if (liked.length < 1) {
            await connection.query(
                `INSERT INTO likes(userId, exercisesId)
            VALUES (?, ?)`,
                [idUser, exercisesId]
            );

            const [likeCount] = await connection.query(
                `SELECT count(id) as likes FROM likes WHERE exercisesId=?`,
                [exercisesId]
            );

            res.send({
                status: 'Ok',
                message: '¡Ha sido añadido a likes!',
                likeCount: likeCount[0].likes,
            });
        } else {
            await connection.query(
                `DELETE FROM likes WHERE userId = ? AND exercisesId = ?`,
                [idUser, exercisesId]
            );

            const [likeCount] = await connection.query(
                `SELECT count(id) as likes FROM likes WHERE exercisesId=?`,
                [exercisesId]
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

const getExercises = async (req, res, next) => {
    let connection;

    try {
        connection = await db();

        const idUser = req.userAuth.id;


        const [likesExercise] = await connection.query (
            `SELECT exercisesId FROM likes WHERE userId = ?`, [idUser]
        )

        const resLikes = likesExercise.map(x => x.exercisesId);

        res.send({
            status: 'Ok',
            data: resLikes
        })   

    } catch (error) {
        next(error);

    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    likeDislike,
    getExercises,    
}