const bcrypt = require('bcrypt');
const { generateError } = require('../helpers');
const { getConnection } = require('./db')

// Crea un usuario en la base de datos y devuelve su id
const createUser = async (email, password) => {
    let connection;

    try {
        connection = await getConnection();
        const [user] = await connection.query(`
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

// Devuelve información del usuario por su id
const getUserById = async (id) => {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(`
        SELECT id, email, createdAt FROM users WHERE id = ?
        `, [id], 
        );

        if (result.length === 0) {
            throw generateError('No existe usuario con ese id', 404)
        }

        return result[0];
    } finally {
        if (connection) connection.release();
    }
};

// Ingreso de usuario por email
const getUserbyEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(`
        SELECT * FROM users WHERE email = ?
        `, [email]
        );

        if (result.length === 0) {
            throw generateError('No existe usuario con ese email', 404)
        }

        return result[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = {
        createUser,
        getUserById,
        getUserbyEmail,
    };