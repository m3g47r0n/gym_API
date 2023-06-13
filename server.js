require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
    newUser,
    getUser,
    login,
} = require('./controllers/users.js');

const {newExercises} = require('./controllers/exercises/newExercises.js');
const {
    getExercises,
    getGoals,
    getMuscleGroup,
} = require('./controllers/exercises/getExercises.js');
const {deleteExercises} = require('./controllers/exercises/deleteExercises.js');

const {
    getWorkouts,
} = require('./controllers/workouts.js');

const {
    getLike,
    likeDislike,
} = require('./controllers/likes.js');

const {
    getFavourite,
    newFavourite,
    putFavourite,
    deleteExerciseInFavourite,
    deleteFavourites,
    newFavouriteExercise,
} = require('./controllers/favourites.js');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Rutas de usuario
app.post('/user', newUser);
app.get('/user/:id', getUser);
app.post('/login', login);

//Rutas de exercises
app.get('/exercises/:id', getExercises);
app.get('/exercises', getGoals);
app.get('/exercises', getMuscleGroup);
app.post('/exercises', newExercises);
app.delete('/exercises/:id', deleteExercises);

//Ruta de workouts
app.get('/', getWorkouts);

//Ruta de like
app.get('/like', getLike);
app.post('/like/:idExercises', likeDislike);

//Ruta de favourite
app.get('/', getFavourite);
app.post('/', newFavourite);
app.put('/', putFavourite);
app.delete('/exercises/:id', deleteExerciseInFavourite);
app.delete('/', deleteFavourites);
app.post('/exercises/:id', newFavouriteExercise);



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
});