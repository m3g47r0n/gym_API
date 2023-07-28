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
                description: 'Túmbate de espaldas. Coge la barra con ambas manos y estira los brazos hacia el techo. Baja la barra tan solo doblando los codos y repite.',
                picture: 'https://tenor.com/view/workout-weights-dumbbells-arm-exercise-gif-11959862',
                type: 'Fuerza',
                muscleGroupId: 1,
                createdAt: new Date(),
            },
            {
                name: 'Extensiones erguidas',
                description: 'De pie, dobla ligeramente las rodillas e inclina la espalda hacia delante manteniéndola siempre recta. Con una mancuerna en cada mano, contrae el bíceps y estira el brazo totalmente hacia atrás.',
                picture: 'https://tenor.com/view/exercise-workout-arm-exercise-dumbbells-gif-11959859',
                type: 'Fuerza',
                muscleGroupId: 1,
                createdAt: new Date(),
            },
            {
                name: 'Zancadas',
                description: 'Coge una mancuerna en cada mano. Colócate de pie mirando siempre al frente y la espalda recta. Da una zancada hacia delante y dobla la rodilla de la pierna extendida hasta formar un ángulo de 90º.',
                picture: 'https://tenor.com/view/lunges-exercise-workout-leg-exercise-working-out-gif-17352592',
                type: 'Equilibrio',
                muscleGroupId: 2,
                createdAt: new Date(),
            },
            {
                name: 'Sentadillas de sumo',
                description: 'Abre las piernas, mirando al frente y espalda siempre recta. Baja la pélvis hasta debajo de la altura de las rodillas y cierra los brazos juntando las manos delante de la cara.',
                picture: 'https://tenor.com/view/sumo-squat-exercise-workout-working-out-gif-17352727',
                type: 'Flexibilidad',
                muscleGroupId: 2,
                createdAt: new Date(),
            },
            {
                name: 'Extensión rodilla-mancuernas',
                description: 'Erguido, coge una mancuerna en cada mano y colócalas, con los brazos extendidos, delante de loscuádriceps. Agacha la espalda, siempre recta, doblando ligeramente las rodillas.',
                picture: 'https://tenor.com/view/workouts-deadlift-gif-24035559',
                type: 'Flexibilidad',
                muscleGroupId: 3,
                createdAt: new Date(),
            },
            {
                name: 'Remo con mancuernas',
                description: 'Coge una mancuerna en cada mano. De pie, agacha la espalda, siempre recta, y extiende los brazos hacia abajo de modo que apunten al suelo. Trae las mancuernas hacia el pecho usando la espalda y doblando el codo.',
                picture: 'https://tenor.com/view/dumbbell-row-standing-gif-10530352',
                type: 'Fuerza',
                muscleGroupId: 3,
                createdAt: new Date(),
            },
            {
                name: 'Press banca inclinado mancuerna',
                description: 'Coge una mancuerna en cada mano. Acuéstate en el banco con el respaldo reclinado. Estira ambos brazos hacia el techo y repite.',
                picture: 'https://tenor.com/view/2inclne-dumbel-press-gif-26653346',
                type: 'Fuerza',
                muscleGroupId: 4,
                createdAt: new Date(),
            },
            {
                name: 'Press banca barra horizontal',
                description: 'Acuéstate horizontalmente en un banco. Con las dos manos, coge la barra y elévala hacia el techo, extendiendo ambos brazo. Baja hasta tocar el pecho y repite.',
                picture: 'https://tenor.com/view/bench-press-gif-26543726',
                type: 'Fuerza',
                muscleGroupId: 4,
                createdAt: new Date(),
            },
            {
                name: 'Press Arnold',
                description: 'Sentado en un banco, coge una mancuerna en cada mano. Eléva los brazos por encima de la cabeza. Al bajarlos, trae las mancuernas hacia delante de la cara girando las muñecas de tal forma que las palmas estén mirando hacia adentro.',
                picture: 'https://tenor.com/view/arnold-press-gif-25588656',
                type: 'Fuerza',
                muscleGroupId: 5,
                createdAt: new Date(),
            },
            {
                name: 'Pájaro erguido',
                description: 'Coge una mancuerna en cada mano. De pie, agacha la espalda hacia delante. Con los brazos estidado y las manos enfrentadas, eleva los brazos lateralmente, como las alas de un pájaro.',
                picture: 'https://tenor.com/view/rear-raise-rear-rear-raise-gym-gif-27091664',
                type: 'Fuerza',
                muscleGroupId: 5,
                createdAt: new Date(),
            }
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
            description VARCHAR(140) NOT NULL,
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
            exercisesId INTEGER NOT NULL,
            createdAt DATETIME NOT NULL,
            modifiedAt DATETIME,
            FOREIGN KEY (goalsId) REFERENCES goals(id),
            FOREIGN KEY (exercisesId) REFERENCES exercises(id)
            );
        `);

    //Tabla de likes
    await connection.query(`
        CREATE TABLE IF NOT EXISTS likes (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            exercisesId INTEGER NOT NULL,
            FOREIGN KEY (exercisesId) REFERENCES exercises(id) ON DELETE CASCADE
            );
        `);

    //Encriptamos la contraseña del administrador
    const hashedPass = await bcrypt.hash('0010', 10);

    // Insertamos el usuario administrador
    await connection.query(
        `
            INSERT INTO users (name, email, password, admin, createdAt) VALUES ("admin", "admin@admin.com", "${hashedPass}", true, ?)
        `,
        [new Date()]
    );

    // Agregamos los grupos musculares.
    await connection.query(
        `INSERT INTO muscleGroup (name, createdAt) VALUES ("brazo", ?)`,
        [new Date()]
    );

    await connection.query(
        `INSERT INTO muscleGroup (name, createdAt) VALUES ("pierna", ?)`,
        [new Date()]
    );
    await connection.query(
        `INSERT INTO muscleGroup (name, createdAt) VALUES ("espalda", ?)`,
        [new Date()]
    );
    await connection.query(
        `INSERT INTO muscleGroup (name, createdAt) VALUES ("pecho", ?)`,
        [new Date()]
    );
    await connection.query(
        `INSERT INTO muscleGroup (name, createdAt) VALUES ("hombro", ?)`,
        [new Date()]
    );
    await insertExercises(connection);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

dbConnection();
