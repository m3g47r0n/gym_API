const { getConnection } = require('../../database/db');
const { generateError } = require('../../helpers');

const createMuscleGroup = async (name) => {
    let connection;
    try {
        connection = await getConnection();

        if (!name) {
            throw generateError('Faltan campos obligatorios.', 400);
        }
        
        //Error si no se introduce un nombre válido
        if (name.length < 2){
            throw generateError('Introduzca grupo muscular por favor.', 400)
        }

        const [ muscleGroup ] = await connection.query(`
        SELECT id FROM muscleGroup WHERE name = ?
        `, [name]
        );

        if (muscleGroup.length > 0) {
            throw generateError('Lo siento, ya existe un grupo muscular con el mismo nombre :(', 409)
        }

        const [ newMuscleGroup] = await connection.query(`
        INSERT INTO muscleGroup (name, createdAt) VALUES (?, ?)
        `, [name, new Date()]
        );
        
        return newMuscleGroup.insertId;
    } finally {
        if (connection) connection.release();
    }
};

const newMuscleGroup = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw generateError('Introduce un grupo muscular valido', 400);
        }

        const id = await createMuscleGroup(name);

        res.send({
            status: 'ok',
            message: `Grupo muscular creado con id: ${id}`
        });

    } catch (error) {
        next(error);
    }
};



module.exports = {
    newMuscleGroup
};