const { generateError } = require('../../middleware/helpers');
const { getConnection } = require('../../database/db');

const workoutChanges = async (id, name, description, goalsId) => {
  let connection;
  try {
    // Conectamos a la base de datos
    connection = await getConnection();

    const [workouts] = await connection.query(
      `
        SELECT * FROM workouts WHERE id = ?
        `,
      [id]
    );

    if (workouts.length === 0) {
      throw generateError('No existen workouts con ese id.', 404);
    }

    //Modifica entrenamiento en la base de datos
    const workoutChanged = await connection.query(
      `
        UPDATE workouts SET 
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        goalsId = COALESCE(?, goalsId),
        modifiedAt = (?) WHERE id = ?
        `,
      [name, description, goalsId, new Date(), id]
    );

    return workoutChanged;
  } finally {
    //Si existe conexión, se libera
    if (connection) connection.release();
  }
};

const modifyWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, description, goalsId } = req.body;

    await workoutChanges(id, name, description, goalsId);

    res.send({
      status: 'ok',
      message: 'Entrenamiento modificado!',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  modifyWorkout,
};
