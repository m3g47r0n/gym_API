const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const addWorkout = async (userId, name, description, goalsId) => {
  let connection;
  try {
    //Conexión con la base de datos
    connection = await getConnection();

    const [workout] = await connection.query(
      `
        SELECT * FROM workouts WHERE name = ?
        `,
      [name]
    );

    if (userId !== 1) {
      throw generateError('Usuario no autorizado para esta acción', 400);
    }

    if (workout.length > 0) {
      throw generateError(
        'Lo siento, ya existe un entrenamiento con el mismo nombre :(',
        409
      );
    }

    const [newWorkouts] = await connection.query(
      `
        INSERT INTO workouts (name, description, goalsId, createdAt) VALUES (?, ?, ?, ?)
        `,
      [name, description, goalsId, new Date()]
    );

    return newWorkouts.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const newWorkout = async (req, res, next) => {
  try {
    const { name, description, goalsId } = req.body;
    const userId = req.authUser.id;

    const id = await addWorkout(userId, name, description, goalsId);

    res.send({
      status: 'ok',
      message: `Entrenamiento creado con id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newWorkout,
};
