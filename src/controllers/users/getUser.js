const { generateError } = require('../../middleware/helpers');
const { getConnection } = require('../../database/db');
const jwt = require('jsonwebtoken');

// Devuelve info de user por su id
const getUserById = async (id) => {
  let connection;
  try {
    //Conexión con la base de datos
    connection = await getConnection();
    const [result] = await connection.query(
      `
        SELECT id, name, email, createdAt, admin FROM users WHERE id = ?
        `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No existe usuario con ese id.', 404);
    }

    return result[0];
  } finally {
    // Si existe conexión, se libera
    if (connection) connection.release();
  }
};

const getUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, process.env.SECRET);
    const userId = payload.id;

    const user = await getUserById(userId);
    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
};
