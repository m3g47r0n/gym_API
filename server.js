require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
    newUserController,
    getUserController,
    loginController,
} = require('./controllers/users');

const {
    getExercisesController,
    newExerciseController,
    getSingleExerciseController,
    deleteExerciseController,
} = require('./controllers/exercises');

const app = express();

app.use(morgan('dev'));

//Rutas de usuario
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

//Rutas de exercises
app.get('/', getExercisesController);
app.post('/', newExerciseController);
app.get('/exercises/:id', getSingleExerciseController);
app.delete('/exercises/:id', deleteExerciseController);

//Middleware de 404
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

//Middleware de gestión de errores
app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});

//Lanzamos el servidor
app.listen(3000, () => {
    console.log('Servidor funcionando');
})