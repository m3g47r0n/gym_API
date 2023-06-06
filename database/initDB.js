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

        await connection.query(`USE gym_API;`)

    } catch (error) {

        console.error(error);

    } finally {

        if (connection) connection.release();
        process.exit();
    }
}

dbConnection();