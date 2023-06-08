const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { generateError } = require('../helpers.js')
const { createUser, getUserById, getUserbyEmail } = require('../database/users.js')

const newUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Introduce un email y password válidos', 400)
        }

        const id = await createUser(email, password);

        res.send({
            status: 'OK',
            message: `Usuario creado con id: ${id}`
        });

    } catch(error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.send({
            status: 'ok',
            data: user,
        });

    } catch(error) {
        next(error);
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

const modifyUser = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented'
        });

    } catch(error) {
        next(error);
    }
};

module.exports = {
    newUser,
    getUser,
    login,
    modifyUser
};