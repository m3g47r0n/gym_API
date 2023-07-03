require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

//const authUser = require("");

//Controladores (controllers)
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

// Rutas
// Registro de un nuevo usuario
app.post('/user', newUser);

// Devuelve usuario por su id
app.get('/user/:id', getUser);

// Ingreso de usuario creado
app.post('/login', login);

// Crea un objetivo nuevo
app.post('/goals', newGoal);

//Devuelve ejercicios con dicho objetivo
app.get('/goals/:id', getListGoals);

//Crea grupo muscular
app.post('/muscleGroup', newMuscleGroup);

//Devuelve ejercicios con el mismo grupo muscular
app.get('/muscleGroup/:id',getListMuscleGroup);

// Crea el ejercicio
app.post('/exercises', newExercises);

// Devuelve ejercicio deseado por su id
app.get('/exercises/:id', getExercises);

// Elimina ejercicio
app.delete('/exercises/:id', deleteExercises);

// Crea un entrenamiento
app.post('/workouts', newWorkout);

// Devuelve entrenamiento deseado
app.get('/workouts', getWorkout);

// Modifica entrenamiento
app.put('/workouts' , modifyWorkout);

// Elimina entrenamiento creado
app.delete('/workouts', deleteWorkout);

// Devuelve likes de un ejercicio
app.get('/likes', getLikes);

// Introduce like o borra el mismo si ya existe
app.post('/likes', likeDislike);

// Middleware de 404
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});

// Lanzamos el servidor
app.listen(3000, () => {
    console.log('Servidor funcionando');
});