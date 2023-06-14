const { getConnection } = require('../../database/db');
const { generateError } = require('../../helpers');

//Objetivos
const getListGoals = async (req, res, next) => {
    let connection;

    try {
        connection = await getConnection();

        const { goals } = req.params;
        console.log(goals)

        const [listGoals] = await connection.query(`
        SELECT e.name, e.id, e.goalsId FROM exercises e WHERE goalsId = ?
        `, [goals]
        );

        if (listGoals.length < 1) {
            throw generateError('Lo siento, no hay ejercicios para el objetivo seleccionado :(', 404);
        }

        res.send({
            status: 'Ok',
            data: listGoals,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
    getListGoals
}