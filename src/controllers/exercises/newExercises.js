const { getConnection } = require('../../database/db');
const { generateError } = require('../../middleware/helpers');

const addExercises = async (
  name,
  description,
  picture,
  type,
  muscleGroupId
) => {
  let connection;
  try {
    //Conexión con la base de datos
    connection = await getConnection();

    const [exercises] = await connection.query(
      `SELECT * FROM exercises WHERE name = ? AND type = ?`,
      [name, type]
    );

    //Comprueba si el ejercicio existe
    if (exercises.length > 0) {
      throw generateError('Lo siento, el ejercicio ya existe :(', 409);
    }

    //Agrega ejercicio en la base de datos
    const [newExercise] = await connection.query(
      `
        INSERT INTO exercises (name, description, picture, type, muscleGroupId, createdAt) VALUES (?, ?, ?, ?, ?, ?)
        `,
      [name, description, picture, type, muscleGroupId, new Date()]
    );

    //Devuelve el id
    return newExercise.insertId;
  } finally {
    //Si existe conexión, se libera
    if (connection) connection.release();
  }
};

//Nuevo ejercicio creado
const newExercise = async (req, res, next) => {
  try {
    const { name, description, picture, type, muscleGroupId } = req.body;

    const exercise = await addExercises(
      name,
      description,
      picture,
      type,
      muscleGroupId
    );

    res.send({
      status: 'ok',
      message: 'Ejercicio creado!',
      exercises: exercise,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newExercise,
};
