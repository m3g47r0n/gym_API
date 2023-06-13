require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const { newUser } = require('./controllers/users/newUser');
const { getUser } = require('./controllers/users/getUser')
const { login } = require('./controllers/users/login')

const {newExercises} = require('./controllers/exercises/newExercises.js');
const {
    getExercises,
    getListGoals,
    getListMuscleGroup,
} = require('./controllers/exercises/getExercises.js');
const {deleteExercises} = require('./controllers/exercises/deleteExercises.js');

const { newWorkout } = require('./controllers/workouts/newWorkout');
const { getWorkout } = require('./controllers/workouts/getWorkout');
const { modifyWorkout } = require('./controllers/workouts/modifyWorkout');
const { deleteWorkout } = require('./controllers/workouts/deleteWorkout');

const { likeDislike } = require('./controllers/likes/likeDislike');
const { getLikes} = require('./controllers/likes/getLikes');

const { newFavourite } = require('./controllers/favourites/newFavourite');
const { newExerciseInFav } = require('./controllers/favourites/newExerciseInFav');
const { getFavourite } = require('./controllers/favourites/getFavourite');
const { modifyFavourite } = require('./controllers/favourites/modifyFavourite')
const { deleteFavourite } = require('./controllers/favourites/deleteFavourite');
const { deleteExerciseInFav } = require('./controllers/favourites/deleteExerciseInFav');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Rutas de usuario
app.post('/user', newUser);
app.get('/user/:id', getUser);
app.post('/login', login);

//Rutas de exercises
app.get('/exercises/:id', getExercises);
app.get('/exercises', getListGoals);
app.get('/exercises', getListMuscleGroup);
app.post('/exercises', newExercises);
app.delete('/exercises/:id', deleteExercises);

//Ruta de workouts
app.get('/workouts', getWorkout);
app.post('/', newWorkout)
app.put('/' , modifyWorkout);
app.delete('/', deleteWorkout);

//Ruta de like
app.get('/like', getLikes);
app.post('/like/:id', likeDislike);

//Ruta de favourite
app.get('/', getFavourite);
app.post('/', newFavourite);
app.post('/exercises/:id', newExerciseInFav);
app.put('/', modifyFavourite);
app.delete('/exercises/:id', deleteExerciseInFav);
app.delete('/', deleteFavourite);

//Rutas de search
app.get 

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