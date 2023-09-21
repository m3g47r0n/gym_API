const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

// likeDislike controller
const favoriteButton = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.authUser.id; // Obtiene el userId del token de autenticación

    // Ejecuta la función workoutFavorite y obtiene el recuento de favoritos actualizado
    const favoriteCount = await workoutFavorite(id, userId); // Pasamos también el userId

    res.send({
      status: 'ok',
      message: `Favorite`,
      favoriteCount: favoriteCount, // Envia el recuento de favoritos al cliente
    });
  } catch (error) {
    next(error);
  }
};

// workoutFavorite controller
const workoutFavorite = async (id, userId) => {
  let connection;
  try {
    // Conexión con la base de datos
    connection = await getConnection();

    const [workout] = await connection.query(
      `
        SELECT * FROM favorites WHERE workoutsId = ? AND userId = ? 
        `,
      [id, userId]
    ); // Aquí también incluimos el userId en la consulta

    // Comprueba si el workout existe en la base de datos.
    if (workout.length === 0) {
      generateError('El workout no existe.', 404);
    }

    if (workout.length < 1) {
      await connection.query(
        `
            INSERT INTO favorites (workoutsId, userId) VALUES (?, ?)  
            `,
        [id, userId]
      );

      const [favoriteCount] = await connection.query(
        `
            SELECT COUNT(id) AS favorites FROM favorites WHERE workoutsId = ?
            `,
        [id]
      );

      return favoriteCount[0];
    } else {
      await connection.query(
        `
            DELETE FROM favorites WHERE workoutsId = ? AND userId = ?  
            `,
        [id, userId]
      );

      const [favoriteCount] = await connection.query(
        `
            SELECT COUNT(id) AS favorites FROM favorites WHERE workoutsId = ?
            `,
        [id]
      );

      return favoriteCount[0];
    }
  } finally {
    // Si existe conexión, se libera
    if (connection) connection.release();
  }
};

module.exports = {
  favoriteButton,
};
