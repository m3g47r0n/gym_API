const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');
const { getConnection } = require('../../database/db');

// Crea un usuario en la base de datos y devuelve su id
const createUser = async (email, password) => {
    let connection;
    try {
        connection = await getConnection();
        const [ user ] = await connection.query(`
        SELECT id FROM users WHERE email = ?
        `, [email]
        );
        
        if (user.length > 0) {
            throw generateError('Ya existe usuario con ese email', 409)
        }

        // Encriptar la password
        const passwordHash = await bcrypt.hash(password, 8);

        // Crear el usuario
        const [ newUser ] = await connection.query(`
        INSERT INTO users (email, password, createdAt) VALUES (?, ?, ?)
        `, [email, passwordHash, new Date()]
        );

        //Devuelve el id
        return newUser.insertId;

    } finally {
        if (connection) connection.release();
    }
};

const newUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Introduce un email y password válidos', 400);
        }

        const id = await createUser(email, password);

        res.send({
            status: 'ok',
            message: `Usuario creado con id: ${id}`
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    newUser
};