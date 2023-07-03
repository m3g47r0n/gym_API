const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const createMuscleGroup = async (name, idUser) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [ muscleGroup ] = await connection.query(`
        SELECT id FROM muscleGroup WHERE name = ? AND idUser = ?
        `, [name, idUser]
        );

        if (idUser > 1) {
            generateError('Usuario no autorizado', 403)
        }

        //Comprueba si el grupo muscular existe
        if (muscleGroup.length > 0) {
            throw generateError('Lo siento, ya existe un grupo muscular con el mismo nombre :(', 409)
        }

        //Agrega grupo muscular en la base de datos
        const [ newMuscleGroup ] = await connection.query(`
        INSERT INTO muscleGroup (name, createdAt) VALUES (?, ?)
        `, [name, new Date()]
        );
        
        return newMuscleGroup.insertId;

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

const newMuscleGroup = async (req, res, next) => {
    try {
        const { name, idUser } = req.body;

        const id = await createMuscleGroup(name, idUser);

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