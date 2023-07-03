const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const createGoal = async (name) => {
    let connection;
    //Conexión con la base de datos
    try {
        connection = await getConnection();
 
        const [ goals ] = await connection.query(`
        SELECT id FROM goals WHERE name = ?
        `, [name]
        );

        // Comprueba si el ejercicio existe en la base de datos.
        if (goals.length > 0) {
            throw generateError('Lo siento, ya existe un goal con el mismo nombre :(', 409)
        }

        //Agrega el nuevo objetivo desde la base de datos
        const [ newGoal ]= await connection.query(`
        INSERT INTO goals (name, createdAt) VALUES (?, ?)
        `, [name, new Date()]
        );

        //Devuelve el id
          return newGoal.insertId;

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

//Nuevo objetivo
const newGoal = async (req, res, next) => {
    try {
        const { name } = req.body;

        //Agregamos nuevo objetivo por su nombre
        const id = await createGoal(name);

        res.send({
            status: 'ok',
            message: `Goal creado con id: ${id}`
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    newGoal
};