const { getConnection } = require('../../database/db');
const { generateError } = require('../../helpers');

const createGoal = async (name) => {
    let connection;
    try {
        connection = await getConnection();

        if (!name) {
            throw generateError('Faltan campos obligatorios.', 400);
        }
        
        //Error si no se introduce un nombre válido
        if (name.length < 2){
            throw generateError('Introduzca un nombre válido, por favor.', 400)
        }

        const [ goals ] = await connection.query(`
        SELECT id FROM goals WHERE name = ?
        `, [name]
        );

        if (goals.length > 0) {
            throw generateError('Lo siento, ya existe un goal con el mismo nombre :(', 409)
        }

        //Crea el nuevo objetivo
        const [ newGoal ]= await connection.query(`
        INSERT INTO goals (name, createdAt) VALUES (?, ?)
        `, [name, new Date()]
        );

        //Devuelve el id
          return newGoal.insertId;

    } finally {
        if (connection) connection.release();
    }
};

const newGoal = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw generateError('Introduce un objetivo valido', 400);
        }

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