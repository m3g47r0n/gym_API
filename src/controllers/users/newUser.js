const bcrypt = require('bcrypt');
const { generateError } = require('../../middleware/helpers');
const { getConnection } = require('../../database/db');

const createUser = async (name, email, password) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();

        const [ user ] = await connection.query(`
        SELECT id FROM users WHERE email = ?
        `, [email]
        );
        
        //Comprueba si el usuario existe
        if (user.length > 0) {
            throw generateError('Ya existe usuario con ese email', 409)
        }

        //Encripta la contraseña
        const passwordHash = await bcrypt.hash(password, 8);

        //Agrega usuario en la base de datos
        const [ addUser ] = await connection.query(`
        INSERT INTO users (name, email, password, createdAt) VALUES (?, ?, ?, ?)
        `, [name, email, passwordHash, new Date()]
        );

        //Devuelve el usuario creado
        return addUser.insertId;

    } finally {
        //Si existe conexión, se libera
        if (connection) connection.release();
    }
};

//Nuevo usuario registrado
const newUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //Creamos al nuevo usuario
        const id = await createUser(name, email, password);

        res.send({
            status: 'ok',
            message: `Usuario creado con id: ${id}!`
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    newUser
};