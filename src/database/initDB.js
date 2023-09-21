require('dotenv').config();
const bcrypt = require('bcrypt');

//Llamada a nuestra función encargada de hacer conexión con la base de datos
const { getConnection } = require('./db');

//Creamons la función insertExercises para poder precargar ejercicios en nuestra aplicación
async function insertExercises(connection) {
  try {
    console.log('Carga de ejercicios en la base de datos');

    //Ejercicios precargados
    const exercisesList = [
      {
        name: 'Francés horizontal',
        description:
          'Túmbate de espaldas. Coge la barra con ambas manos y estira los brazos hacia el techo. Baja la barra solo doblando los codos y repite.',
        picture: 'https://media.tenor.com/Zr4aVZVbkjgAAAAC/workout-weights.gif',
        type: 'Fuerza',
        muscleGroupId: 1,
        createdAt: new Date(),
      },
      {
        name: 'Extensiones erguidas',
        description:
          'De pie, dobla ligeramente las rodillas e inclina la espalda hacia delante manteniéndola siempre recta. Con una mancuerna en cada mano, contrae el bíceps y estira el brazo totalmente hacia atrás.',
        picture:
          'https://media.tenor.com/ZuBIctV9gLsAAAAC/exercise-workout.gif',
        type: 'Fuerza',
        muscleGroupId: 1,
        createdAt: new Date(),
      },
      {
        name: 'Zancadas',
        description:
          'Coge una mancuerna en cada mano. Colócate de pie mirando siempre al frente y la espalda recta. Da una zancada hacia delante y dobla la rodilla de la pierna extendida hasta formar un ángulo de 90º.',
        picture: 'https://media.tenor.com/fWiC9Ze5eUMAAAAC/lunges-exercise.gif',
        type: 'Equilibrio',
        muscleGroupId: 2,
        createdAt: new Date(),
      },
      {
        name: 'Sentadillas de sumo',
        description:
          'Abre las piernas, mirando al frente y espalda siempre recta. Baja la pélvis hasta debajo de la altura de las rodillas y cierra los brazos juntando las manos delante de la cara.',
        picture:
          'https://media.tenor.com/jAjshaoXrewAAAAC/sumo-squat-exercise.gif',
        type: 'Flexibilidad',
        muscleGroupId: 2,
        createdAt: new Date(),
      },
      {
        name: 'Extensión rodilla-mancuernas',
        description:
          'Erguido, coge una mancuerna en cada mano y colócalas, con los brazos extendidos, delante de loscuádriceps. Agacha la espalda, siempre recta, doblando ligeramente las rodillas.',
        picture:
          'https://media.tenor.com/T-L7dxrLv7EAAAAC/workouts-deadlift.gif',
        type: 'Flexibilidad',
        muscleGroupId: 3,
        createdAt: new Date(),
      },
      {
        name: 'Remo con mancuernas',
        description:
          'Coge una mancuerna en cada mano. De pie, agacha la espalda, siempre recta, y extiende los brazos hacia abajo de modo que apunten al suelo. Trae las mancuernas hacia el pecho usando la espalda y doblando el codo.',
        picture: 'https://media.tenor.com/XehF1R8EzM4AAAAC/dumbbell-row.gif',
        type: 'Fuerza',
        muscleGroupId: 3,
        createdAt: new Date(),
      },
      {
        name: 'Press banca inclinado mancuerna',
        description:
          'Coge una mancuerna en cada mano. Acuéstate en el banco con el respaldo reclinado. Estira ambos brazos hacia el techo y repite.',
        picture:
          'https://media.tenor.com/9T1dx6LbbgwAAAAC/2inclne-dumbel-press.gif',
        type: 'Fuerza',
        muscleGroupId: 4,
        createdAt: new Date(),
      },
      {
        name: 'Press banca barra horizontal',
        description:
          'Acuéstate horizontalmente en un banco. Con las dos manos, coge la barra y elévala hacia el techo, extendiendo ambos brazo. Baja hasta tocar el pecho y repite.',
        picture: 'https://media.tenor.com/0hoNLcggDG0AAAAC/bench-press.gif',
        type: 'Fuerza',
        muscleGroupId: 4,
        createdAt: new Date(),
      },
      {
        name: 'Press Arnold',
        description:
          'Sentado en un banco, coge una mancuerna en cada mano. Eléva los brazos por encima de la cabeza. Al bajarlos, trae las mancuernas hacia delante de la cara girando las muñecas de tal forma que las palmas estén mirando hacia adentro.',
        picture: 'https://media.tenor.com/ZR-_3Mxq0gYAAAAC/arnold-press.gif',
        type: 'Fuerza',
        muscleGroupId: 5,
        createdAt: new Date(),
      },
      {
        name: 'Pájaro erguido',
        description:
          'Coge una mancuerna en cada mano. De pie, agacha la espalda hacia delante. Con los brazos estidado y las manos enfrentadas, eleva los brazos lateralmente, como las alas de un pájaro.',
        picture: 'https://media.tenor.com/HTvjufujuJAAAAAC/rear-raise-rear.gif',
        type: 'Fuerza',
        muscleGroupId: 5,
        createdAt: new Date(),
      },
    ];

    //Introducimos los ejercicios en la tabla "exercises"
    for (const exercise of exercisesList) {
      await connection.query(
        `
        INSERT INTO exercises (name, description, picture, type, muscleGroupId, createdAt) VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          exercise.name,
          exercise.description,
          exercise.picture,
          exercise.type,
          exercise.muscleGroupId,
          exercise.createdAt,
        ]
      );
    }
    console.log('Ejercicios introducidos correctamente.');
  } catch (error) {
    console.log('Error al introducir los ejercicios:', error);
  }
}

async function insertWorkout(connection) {
  try {
    console.log('Carga de ejercicios en la base de datos');

    //Ejercicios precargados
    const workoutList = [
      {
        name: 'HIIT Cardio',
        description:
          'Basado en sesiones de intervalos cortos y muy intensos que alternan esfuerzo y recuperación.',
        goalsId: 4,
        createdAt: new Date(),
      },
      {
        name: 'Resistencia',
        description:
          'Ejercicios físicos que inducen contracciones musculares y desarrollan fuerza, resistencia anaeróbica y resistencia muscular.',
        goalsId: 3,
        createdAt: new Date(),
      },
      {
        name: 'Yoga',
        description:
          'Posturas básicas de yoga para relajarte y estirar el cuerpo.',
        goalsId: 2,
        createdAt: new Date(),
      },
      {
        name: 'Going Stronger',
        description:
          'Los aumentos de fuerza te harán rendir al máximo en tu temporada de volumen.',
        goalsId: 1,
        createdAt: new Date(),
      },
      {
        name: 'Warm-up',
        description: 'Ejercicios para un calentamiento antes de empezar.',
        goalsId: 3,
        createdAt: new Date(),
      },
    ];

    //Introducimos entrenamientos en la tabla "workouts"
    for (const workout of workoutList) {
      await connection.query(
        `
          INSERT INTO workouts (name, description, goalsId, createdAt) VALUES (?, ?, ?, ?)
        `,
        [workout.name, workout.description, workout.goalsId, workout.createdAt]
      );
    }
    console.log('Entrenamientos introducidos correctamente.');
  } catch (error) {
    console.log('Error al introducir los ejercicios:', error);
  }
}

async function insertExercisesWorkouts(connection) {
  try {
    console.log('Cargando ejercicios en entrenamientos');

    //Ejercicios en entrenamientos precargados
    const exercisesInWorkouts = [
      {
        workoutId: 4,
        exerciseId: 1,
      },
      {
        workoutId: 4,
        exerciseId: 2,
      },
      {
        workoutId: 1,
        exerciseId: 6,
      },
      {
        workoutId: 1,
        exerciseId: 7,
      },
      {
        workoutId: 1,
        exerciseId: 8,
      },
      {
        workoutId: 1,
        exerciseId: 9,
      },
      {
        workoutId: 3,
        exerciseId: 4,
      },
      {
        workoutId: 2,
        exerciseId: 1,
      },
      {
        workoutId: 2,
        exerciseId: 2,
      },
      {
        workoutId: 2,
        exerciseId: 3,
      },
      {
        workoutId: 2,
        exerciseId: 4,
      },
      {
        workoutId: 2,
        exerciseId: 5,
      },
      {
        workoutId: 2,
        exerciseId: 6,
      },
    ];

    //Introducimos los ejercicios en la tabla "workouts_exercises"
    for (const exercises of exercisesInWorkouts) {
      await connection.query(
        `
          INSERT INTO workouts_exercises (workoutId, exerciseId) VALUES (?, ?)
        `,
        [exercises.workoutId, exercises.exerciseId]
      );
    }
    console.log('Ejercicios introducidos correctamente en entrenamientos.');
  } catch (error) {
    console.log('Error para introducir los ejercicos en los entrenamientos.');
  }
}

async function dbConnection() {
  let connection;
  const { MYSQL_DATABASE } = process.env;
  try {
    //Conexión con la base de datoss
    connection = await getConnection();

    console.log('Borrando base de datos si existe...');
    await connection.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE};`);

    console.log('Creando base de datos si no existe...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};`);

    await connection.query(`USE ${MYSQL_DATABASE};`);

    //Tabla de usuarios
    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name varchar(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(150) NOT NULL,
            admin BOOL DEFAULT false,
            createdAt DATETIME NOT NULL
            );
        `);

    //Tabla de grupo muscular
    await connection.query(`
        CREATE TABLE IF NOT EXISTS muscleGroup (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50),
            createdAt DATETIME NOT NULL
            );
        `);

    //Tabla de objetivos
    await connection.query(`
        CREATE TABLE IF NOT EXISTS goals (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50),
            createdAt DATETIME NOT NULL
            );
        `);

    //Tabla de ejercicios
    await connection.query(`
        CREATE TABLE IF NOT EXISTS exercises (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            description VARCHAR(1000) NOT NULL,
            picture VARCHAR(300) NOT NULL,
            type VARCHAR(50) NOT NULL,
            muscleGroupId INTEGER NOT NULL,
            createdAt DATETIME NOT NULL,
            FOREIGN KEY (muscleGroupId) REFERENCES muscleGroup(id)
            );
        `);

    //Tabla de entrenamientos
    await connection.query(`
        CREATE TABLE IF NOT EXISTS workouts (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            description VARCHAR(140) NOT NULL,
            goalsId INTEGER NOT NULL,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME,
            FOREIGN KEY (goalsId) REFERENCES goals(id)
            );
        `);

    //Tabla de ejercicios de entrenamiento
    await connection.query(`
    CREATE TABLE IF NOT EXISTS workouts_exercises (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        workoutId INTEGER NOT NULL,
        exerciseId INTEGER NOT NULL,
        FOREIGN KEY (workoutId) REFERENCES workouts(id),
        FOREIGN KEY (exerciseId) REFERENCES exercises(id)
        );
    `);

    //Tabla de likes
    await connection.query(`
        CREATE TABLE IF NOT EXISTS likes (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            exercisesId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY (exercisesId) REFERENCES exercises(id) ON DELETE CASCADE,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

    //Tabla de favoritos
    await connection.query(`
        CREATE TABLE IF NOT EXISTS favorites (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            workoutsId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY (workoutsId) REFERENCES workouts(id) ON DELETE CASCADE,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

    //Encriptamos la contraseña del administrador
    const hashedPass = await bcrypt.hash('0010', 10);

    // Insertamos el usuario administrador
    await connection.query(
      `INSERT INTO users (name, email, password, admin, createdAt) VALUES ("admin", "admin@admin.com", "${hashedPass}", true, ?)`,
      [new Date()]
    );

    // Agregamos los grupos musculares.
    await connection.query(
      `INSERT INTO muscleGroup (name, createdAt) VALUES ("Brazo", ?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO muscleGroup (name, createdAt) VALUES ("Pierna", ?)`,
      [new Date()]
    );
    await connection.query(
      `INSERT INTO muscleGroup (name, createdAt) VALUES ("Espalda", ?)`,
      [new Date()]
    );
    await connection.query(
      `INSERT INTO muscleGroup (name, createdAt) VALUES ("Pecho", ?)`,
      [new Date()]
    );
    await connection.query(
      `INSERT INTO muscleGroup (name, createdAt) VALUES ("Hombro", ?)`,
      [new Date()]
    );

    // Agregamos objetivos.
    await connection.query(
      `INSERT INTO goals (name, createdAt) VALUES ("Fuerza", ?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO goals (name, createdAt) VALUES ("Flexibilidad", ?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO goals (name, createdAt) VALUES ("Resistencia", ?)`,
      [new Date()]
    );

    await connection.query(
      `INSERT INTO goals (name, createdAt) VALUES ("Baja de peso", ?)`,
      [new Date()]
    );

    await insertExercises(connection);
    await insertWorkout(connection);
    await insertExercisesWorkouts(connection);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

dbConnection();
