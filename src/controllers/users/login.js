const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../../middleware/helpers');
const { getConnection } = require('../../database/db');

// Devuelve usuario por su email
const getUserbyEmail = async (email) => {
  let connection;
  try {
    //Conexión con la base de datos
    connection = await getConnection();
    const [result] = await connection.query(
      `
        SELECT * FROM users WHERE email = ?
        `,
      [email]
    );

    // Error si el usuario no se ha registrado
    if (result.length === 0) {
      throw generateError('No existe usuario con ese email.', 404);
    }

    //Devuelve el email
    return result[0];
  } finally {
    // Si existe conexión, se libera
    if (connection) connection.release();
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserbyEmail(email);

    // Compara contraseña encriptada y la introducida
    const validPassword = await bcrypt.compare(password, user.password);

    // Error al no ser la misma
    if (!validPassword) {
      throw generateError('La contraseña no es la correcta', 401);
    }

    const payload = { id: user.id };

    //Firma del token
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '60d',
    });

    const userId = user.id;
    const isAdmin = user.admin;

    res.send({
      status: 'ok',
      token: token,
      user: userId,
      isAdmin: isAdmin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
