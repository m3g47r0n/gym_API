const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const deleteWorkoutExerciseById = async (workoutsExercisesId) => {
  let connection;
  try {
    //Conexión con la base de datos
    connection = await getConnection();

    const [workout] = await connection.query(
      `
        SELECT * FROM workouts_exercises WHERE id = ?
        `,
      [workoutsExercisesId]
    );

    // Comprueba que el ejercicio existe.
    if (workout.length < 1) {
      throw generateError('Lo siento, el ejercicio no existe :(', 404);
    }

    // Elimina el ejercicio.
    const [deleteWorkout] = await connection.query(
      `
        DELETE FROM workouts_exercises WHERE id = ?
        `,
      [workoutsExercisesId]
    );

    //Devuelve ejercicio ya eliminado.
    return deleteWorkout;
  } finally {
    //Si existe conexión, se libera.
    if (connection) connection.release();
  }
};

//Entrenamiento eliminado
const deleteExerciseInWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;

    //Eliminamos el entrenamiento seleccionado por su id
    await deleteWorkoutExerciseById(id);

    res.send({
      status: 'ok',
      message: 'Ejercicio eliminado',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteExerciseInWorkout,
};
