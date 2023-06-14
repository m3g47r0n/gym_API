require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const { newUser } = require('./controllers/users/newUser');
const { getUser } = require('./controllers/users/getUser');
const { login } = require('./controllers/users/login');

const { newGoal } = require('./controllers/goals/addGoals');
const { getListGoals } = require('./controllers/goals/getGoalsExercises');

const { newMuscleGroup } = require('./controllers/muscleGroup/addMuscleGroup');
const { getListMuscleGroup} = require('./controllers/muscleGroup/getMuscleExercises');

const { newExercises } = require('./controllers/exercises/newExercises');
const { getExercises } = require('./controllers/exercises/getExercises');
const { deleteExercises } = require('./controllers/exercises/deleteExercises');

const { newWorkout } = require('./controllers/workouts/newWorkout');
const { getWorkout } = require('./controllers/workouts/getWorkout');
const { modifyWorkout } = require('./controllers/workouts/modifyWorkout');
const { deleteWorkout } = require('./controllers/workouts/deleteWorkout');

const { likeDislike } = require('./controllers/likes/likeDislike');
const { getLikes } = require('./controllers/likes/getLike');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Rutas de usuario
app.post('/user', newUser);
app.get('/user/:id', getUser);
app.post('/login', login);

//Rutas de goals
app.post('/goals', newGoal);
app.get('/goals/:id', getListGoals);

//Rutas de muscleGroup
app.post('/muscleGroup', newMuscleGroup);
app.get('/muscleGroup/:id',getListMuscleGroup);

//Rutas de exercises
app.get('/exercises/:id', getExercises);
app.post('/exercises', newExercises);
app.delete('/exercises/:id', deleteExercises);

//Ruta de workouts
app.get('/workouts', getWorkout);
app.post('/workouts', newWorkout)
app.put('/workouts' , modifyWorkout);
app.delete('/workouts', deleteWorkout);

//Ruta de like
app.get('/likes', getLikes);
app.post('/likes', likeDislike);

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