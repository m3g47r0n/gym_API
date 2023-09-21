const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getGoals = async () => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();
        
        const [ goals ] = await connection.query(`
        SELECT name FROM goals
        `);

        // Comprueba si el grupo muscular existe en la base de datos
        if (!goals) {
            throw generateError('No existe ningún objetivo aún :(.', 404);
        }

        // Retornamos los grupos musculares
        return goals;

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

const getAllGoals = async (req, res, next) => {
    try {
        const goals = await getGoals();

        res.send({
            status: 'Ok',
            data: goals,
        });

    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllGoals
};