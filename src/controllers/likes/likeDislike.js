const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');
// likeDislike controller
const likeDislike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.authUser.id; // Obtiene el userId del token de autenticación
    // Ejecuta la función exerciseLike y obtiene el recuento de likes actualizado
    const likeCount = await exerciseLike(id, userId); // Pasamos también el userId
    res.send({
      status: 'ok',
      message: `Like`,
      likeCount: likeCount, // Envia el recuento de likes al cliente
    });
  } catch (error) {
    next(error);
  }
};
// exerciseLike controller
const exerciseLike = async (id, userId) => {
  let connection;
  try {
    // Conexión con la base de datos
    connection = await getConnection();
    const [exercise] = await connection.query(
      `
      SELECT * FROM likes WHERE exercisesId = ? AND userId = ?
      `,
      [id, userId]
    ); // Aquí también incluimos el userId en la consulta
    // Comprueba si el ejercicio existe en la base de datos.
    if (exercise.length === 0) {
      generateError('El ejercicio no existe.', 404);
    }
    if (exercise.length < 1) {
      await connection.query(
        `
      INSERT INTO likes (exercisesId, userId) VALUES (?, ?)
      `,
        [id, userId]
      );
      const [likeCount] = await connection.query(
        `
        SELECT COUNT(id) AS likes FROM likes WHERE exercisesId = ?
        `,
        [id]
      );
      return likeCount[0];
    } else {
      await connection.query(
        `
            DELETE FROM likes WHERE exercisesId = ? AND userId = ?
            `,
        [id, userId]
      );
      const [likeCount] = await connection.query(
        `
            SELECT COUNT(id) AS likes FROM likes WHERE exercisesId = ?
            `,
        [id]
      );
      return likeCount[0];
    }
  } finally {
    // Si existe conexión, se libera
    if (connection) connection.release();
  }
};
module.exports = {
  likeDislike,
};
