require('dotenv').config();
const bcrypt = require('bcrypt');

//Llamada a nuestra función encargada de hacer conexión con la base de datos
const { getConnection } = require('./db');

async function dbConnection() {
    let connection;
    const { MYSQL_DATABASE } = process.env
    try {
        //Conexión con la base de datoss
        connection = await getConnection();

        console.log("Borrando base de datos si existe...");
        await connection.query(`DROP DATABASE IF EXISTS ${MYSQL_DATABASE};`);

        console.log("Creando base de datos si no existe...");
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};`)

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
        await connection.query(`
        INSERT INTO users (name, email, password, admin, createdAt) VALUES ("admin", "admin@admin.com", "${hashedPass}", true, ?)
        `, [new Date()]
        );

    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

dbConnection();