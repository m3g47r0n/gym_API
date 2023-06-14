const { getConnection } = require('../../database/db');
const { generateError, deletePicture } = require('../../helpers');

const deleteExercises = async (req, res, next) => {
    let connection;
    try {
        connection = await getConnection();

        const { exerciseId } = req.params;

        // Comprueba que el ejercicio existe.
        const [exercise] = await connection.query(`
        SELECT * FROM exercises WHERE id = ?
        `, [exerciseId]
        );

        if (exercise.length < 1) {
            throw generateError('Lo siento, el ejercicio no existe :(', 404);
        }

        const pictureName = exercise[0].picture
        await deletePicture(pictureName);

        // Elimina el ejercicio.
        await connection.query(`
        DELETE FROM exercises WHERE id = ?
        `, [exerciseId]
        );

        res.send({
            status: 'Ok',
            message: '¡Voilà, el ejercicio ha sido eliminado!',
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    deleteExercises
};