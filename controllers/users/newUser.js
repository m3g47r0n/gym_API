const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');
const { getConnection } = require('../../database/db');

// Crea un usuario en la base de datos y devuelve su id
const createUser = async (email, password) => {
    let connection;
    try {
        //Conexión con la base de datos
        connection = await getConnection();
        const [ user ] = await connection.query(`
        SELECT id FROM users WHERE email = ?
        `, [email]
        );
        
        // Si el usuario existe, devolvemos error
        if (user.length > 0) {
            throw generateError('Ya existe usuario con ese email', 409)
        }

        // Encripta la contraseña (password)
        const passwordHash = await bcrypt.hash(password, 8);

        // Agrega usuario en la base de datos
        const [ newUser ] = await connection.query(`
        INSERT INTO users (email, password, createdAt) VALUES (?, ?, ?)
        `, [email, passwordHash, new Date()]
        );

        //Devuelve el id
        return newUser.insertId;

    } finally {
        // Si existe conexión, se libera
        if (connection) connection.release();
    }
};

// Nuevo usuario registrado
const newUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Error al no introducir campos válidos
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