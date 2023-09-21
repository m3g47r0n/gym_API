const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const getExercisesWorkoutsById = async (id) => {
  let connection;
  try {
    //Conexión con la base de datos
    connection = await getConnection();

    const [exercises] = await connection.query(
      `
        SELECT exercises.* FROM exercises JOIN workouts_exercises ON exercises.id = workouts_exercises.exerciseId
        JOIN workouts ON workouts_exercises.workoutId = workouts.id WHERE workouts.id = ?
        `,
      [id]
    );

    // Comprueba si los ejercicios existen en la base de datos.
    if (exercises.length === 0) {
      throw generateError('Lo siento, los ejercicios no existen :(', 404);
    }

    //Devuelve los ejercicios
    return exercises;
  } finally {
    //Si existe conexión, se libera
    if (connection) connection.release();
  }
};

//Devuelve todos los ejercicios existentes
const exercisesInWorkouts = async (req, res, next) => {
  try {
    const { id } = req.params;

    //Llamamos a los ejercicio en nuestra base de datos
    const exercises = await getExercisesWorkoutsById(id);

    res.send({
      status: 'Ok',
      data: exercises,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  exercisesInWorkouts,
};
