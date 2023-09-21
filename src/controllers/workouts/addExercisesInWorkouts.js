const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const addExercise = async (workoutId, exerciseId) => {
  let connection;
  try {
    //Conexión con la base de datos
    connection = await getConnection();

    const [workouts] = await connection.query(
      `
        SELECT * FROM workouts_exercises we JOIN workouts w ON we.id = w.id WHERE workoutId = ?
        `,
      [workoutId]
    );

    if (workouts === 0 || workouts.length < 0) {
      throw generateError('El entrenamiento no existe', 404);
    }

    const [newExerciseInWorkout] = await connection.query(
      `
        INSERT INTO workouts_exercises (workoutId, exerciseId) VALUES (?, ?)
        `,
      [workoutId, exerciseId]
    );

    return newExerciseInWorkout.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const addExercisesInWorkout = async (req, res, next) => {
  try {
    const { workoutId, exerciseId } = req.body;

    const id = await addExercise(workoutId, exerciseId);

    res.send({
      status: 'ok',
      message: `Ejercicio ingresado! ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addExercisesInWorkout,
};
