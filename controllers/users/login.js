const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../../helpers');
const { getConnection } = require('../../database/db');

// Ingreso de usuario
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

const login = async (req, res, next) => {
    try {
        const { email , password } = req.body;

        if (!email || !password) {
            throw generateError('Envia tu  email y password', 400)
        }

        const user = await getUserbyEmail(email);

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw generateError('La contraseña no es la correcta', 401);
        }

        const payload = { id: user.id };

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '60d',
        });

        res.send({
            status: 'ok',
            data: token
        });

    } catch(error) {
        next(error);
    }
};


module.exports = {
        login
    };