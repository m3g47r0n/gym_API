const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

//Grupo de músculos
const getMuscleExercises = async (req, res, next) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const { muscleGroup } = req.params;

        const [listMuscleGroup] = await connection.query(`
        SELECT name, description, picture, type FROM exercises WHERE muscleGroupId = ?
        `, [muscleGroup]
        );

        if (listMuscleGroup.length < 1) {
            throw generateError('Lo siento, el grupo muscular no tiene ningún ejercicio asignado :(', 404);
        }

        res.send({
            status: 'Ok',
            data: listMuscleGroup,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    getMuscleExercises
}
