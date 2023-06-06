require('dotenv').config();

const { getConnection } = require('./db');

async function dbConnection() {

    let connection;

    try {

        connection = await getConnection();

        console.log("Borrando base de datos si existe...");
        await connection.query(`DROP DATABASE IF EXISTS gym_API;`);

        console.log("Creando base de datos si no existe...");
        await connection.query(`CREATE DATABASE IF NOT EXISTS gym_API;`)

        await connection.query(`USE gym_API;`);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
            id CHAR(30) PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            admin BOOL DEFAULT false
            );
        `);

/*
        await connection.query(`
        CREATE TABLE IF NOT EXISTS admin_app (
            id SMALLINT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            admin_app BOOL DEFAULT true
            );
        `);
*/

        await connection.query(`
        CREATE TABLE IF NOT EXISTS muscleGroup (
            id CHAR(30) PRIMARY KEY,
            name VARCHAR(50)
            );
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS goals (
            id CHAR(30) PRIMARY KEY,
            name VARCHAR(50)
            );
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS exercises (
            id CHAR(30) PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description VARCHAR(140) NOT NULL,
            picture VARCHAR(300) NOT NULL,
            goalsId VARCHAR(50) NOT NULL,
            muscleGroupId VARCHAR(50) NOT NULL,
            FOREIGN KEY (goalsId) REFERENCES goals(id),
            FOREIGN KEY (muscleGroupId) REFERENCES muscleGroup(id)
            );
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS workouts (
            id CHAR(30) PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            description VARCHAR(140) NOT NULL,
            goalsId VARCHAR(50) NOT NULL,
            muscleGroupId VARCHAR(50) NOT NULL,
            FOREIGN KEY (goalsId) REFERENCES goals(id),
            FOREIGN KEY (muscleGroupId) REFERENCES muscleGroup(id)
            );
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS exercisesLikes (
            id CHAR(30) PRIMARY KEY,
            exercisesId CHAR(36) NOT NULL,
            FOREIGN KEY (exercisesId) REFERENCES exercises(id) ON DELETE CASCADE
            );
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS favourites (
            id CHAR(30) PRIMARY KEY,
            name VARCHAR(50),
            exercises_id VARCHAR(50),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);


    } catch (error) {

        console.error(error);

    } finally {

        if (connection) connection.release();
        process.exit();
    }
}

dbConnection();