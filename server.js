require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
    newUser,
    getUser,
    login,
    modifyUser
} = require('./controllers/users');

const {
    getExercises,
    newExercises,
    putExercises,
    deleteExercises,
} = require('./controllers/exercises');

const {
    getWorkouts,
    newWorkout,
    modifyWorkout,
    deleteWorkout
} = require('./controllers/workouts');

const {
    getLike,
    newLike,
    deleteLike,
} = require('./controllers/likes');

const {
    getFavourite,
    newFavourite,
    putFavourite,
    deleteExerciseInFav,
    deleteFavourites,
    newFavouriteExercise,
} = require('./controllers/favourites');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Rutas de usuario
app.post('/user', newUser);
app.get('/user/:id', getUser);
app.post('/login', login);
app.put('/user/:id', modifyUser)

//Rutas de exercises
app.get('/exercises/:id', getExercises);
app.post('/exercises', newExercises);
app.put('/exercises/:id', putExercises);
app.delete('/exercises/:id', deleteExercises);

//Ruta de workouts
app.get('/workouts', getWorkouts);
app.post('/', newWorkout)
app.put('/' , modifyWorkout);
app.delete('/', deleteWorkout);


//Ruta de like
app.get('/likes', getLike);
app.post('/likes', newLike);
app.delete('/likes/:id', deleteLike);

//Ruta de favourite
app.get('/', getFavourite);
app.post('/', newFavourite);
app.post('/exercises/:id', newFavouriteExercise);
app.put('/', putFavourite);
app.delete('/exercises/:id', deleteExerciseInFav);
app.delete('/', deleteFavourites);

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