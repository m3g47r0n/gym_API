const { getConnection } = require('../../database/db');

const getLikes = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

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
    getLikes   
};
