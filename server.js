require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
    newUser,
    getUser,
    login,
} = require('./controllers/users');

const {
    getExercises,
    newExercises,
    putExercises,
    deleteExercises,
} = require('./controllers/exercises');

const {
    getWorkouts,
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
    deleteExerciseInFavourite,
    deleteFavourites,
    newFavouriteExercise,
} = require('./controllers/favourites');

const app = express();

app.use(morgan('dev'));

//Rutas de usuario
app.post('/user', newUser);
app.get('/user/:id', getUser);
app.post('/login', login);

//Rutas de exercises
app.get('/', getExercises);
app.post('/', newExercises);
app.put('/', putExercises);
app.delete('/exercises/:id', deleteExercises);

//Ruta de workouts
app.get('/', getWorkouts);

//Ruta de like
app.get('/', getLike);
app.post('/', newLike);
app.delete('/exercises/:id', deleteLike);

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
})