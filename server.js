require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: [
      'https://warrior-gym.es',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
  })
);

//Controllers
const { newUser } = require('./src/controllers/users/newUser');
const { getUser } = require('./src/controllers/users/getUser');
const { login } = require('./src/controllers/users/login');

const { newGoal } = require('./src/controllers/goals/addGoals');
const { getWorkoutGoals } = require('./src/controllers/goals/getGoalsWorkouts');
const { getAllGoals } = require('./src/controllers/goals/getAllGoals');

const {
  newMuscleGroup,
} = require('./src/controllers/muscleGroup/addMuscleGroup');
const {
  getMuscleExercises,
} = require('./src/controllers/muscleGroup/getMuscleExercises');
const {
  getAllMuscles,
} = require('./src/controllers/muscleGroup/getAllMuscleGroups');

const { newExercise } = require('./src/controllers/exercises/newExercises');
const { getExercise } = require('./src/controllers/exercises/getExercises');
const {
  deleteExercise,
} = require('./src/controllers/exercises/deleteExercises');
const {
  getAllExercises,
} = require('./src/controllers/exercises/getAllExercises');
const {
  addExercisesInWorkout,
} = require('./src/controllers/exercises/addExercisesInWorkouts');

const { newWorkout } = require('./src/controllers/workouts/newWorkout');
const { getWorkout } = require('./src/controllers/workouts/getWorkout');
const {
  exercisesInWorkouts,
} = require('./src/controllers/workouts/exercisesInWorkouts');
const { getAllWorkouts } = require('./src/controllers/workouts/getAllWorkouts');
const { modifyWorkout } = require('./src/controllers/workouts/modifyWorkout');
const { deleteWorkout } = require('./src/controllers/workouts/deleteWorkout');

const { likeDislike } = require('./src/controllers/likes/likeDislike');
const { getLikes } = require('./src/controllers/likes/getLike');
const {
  getLikedExercises,
} = require('./src/controllers/likes/getLikedExercises');

const {
  getFavoriteWorkouts,
} = require('./src/controllers/favorites/getFavoriteWorkout');
const {
  favoriteButton,
} = require('./src/controllers/favorites/favoriteButton');
const { getFavorites } = require('./src/controllers/favorites/getFavorites');

//Valida la información introducida en el body
const validateInfo = require('./src/middleware/validateInfo');
const registerSchema = require('./src/validators/registerSchema');
const loginSchema = require('./src/validators/loginSchema');
const exerciseSchema = require('./src/validators/exerciseSchema');
const wourkoutSchema = require('./src/validators/workoutSchema');
const goalsMuscleSchema = require('./src/validators/goalsMuscleSchema');

const checkToken = require('./src/middleware/checkToken');
const isAdmin = require('./src/middleware/isAdmin');

// Rutas:
// Registro de un nuevo usuario
app.post('/users/register', validateInfo(registerSchema), newUser);

// Devuelve usuario por su id
app.get('/user', checkToken, getUser);

// Ingreso de usuario creado
app.post('/users/login', validateInfo(loginSchema), login);

// Crea un objetivo nuevo
app.post(
  '/goals',
  checkToken,
  isAdmin,
  validateInfo(goalsMuscleSchema),
  newGoal
);

//Devuelve ejercicios con dicho objetivo
app.get('/goals/:id', checkToken, getWorkoutGoals);

//Devuelve todos los objetivos
app.get('/goals', checkToken, getAllGoals);

//Crea grupo muscular
app.post(
  '/muscleGroup',
  checkToken,
  isAdmin,
  validateInfo(goalsMuscleSchema),
  newMuscleGroup
);

//Devuelve ejercicios con el mismo grupo muscular
app.get('/muscleGroups/:id', checkToken, getMuscleExercises);

//Devuelve todos los grupos musculares
app.get('/muscleGroups', checkToken, getAllMuscles);

// Crea el ejercicio
app.post(
  '/exercises',
  checkToken,
  isAdmin,
  validateInfo(exerciseSchema),
  newExercise
);

// Devuelve ejercicio deseado por su id
app.get('/exercises/:id', checkToken, getExercise);

//Devuelve todos los ejercicios
app.get('/exercises', checkToken, getAllExercises);

// Elimina ejercicio
app.delete('/exercises/:id', checkToken, isAdmin, deleteExercise);

// Crea un entrenamiento
app.post(
  '/workouts',
  checkToken,
  isAdmin,
  validateInfo(wourkoutSchema),
  newWorkout
);

// Devuelve entrenamiento deseado
app.get('/workouts/:id', checkToken, getWorkout);

//Devuelve ejercicios dentro del workout deseado
app.get('/workout/:id', checkToken, exercisesInWorkouts);

//Devuelve todos los entrenamientos
app.get('/workouts', checkToken, getAllWorkouts);

// Modifica entrenamiento
app.put('/workouts/:id', checkToken, isAdmin, modifyWorkout);

// Elimina entrenamiento creado
app.delete('/workouts/:id', checkToken, isAdmin, deleteWorkout);

//Añade ejercicios en un workout
app.post('/exercisesworkouts', checkToken, isAdmin, addExercisesInWorkout);

// Introduce like o borra el mismo si ya existe
app.post('/likes/:id', checkToken, likeDislike);

//Devuelve cantidad de likes por ejercicio. No hace falta, el total de likes de un ejercicio debe venir
// cuando hagamos un GET a "/exercises/:id"
app.get('/likes/:id', checkToken, getLikes);

//Obtiene los ejercicios con "me gusta" del usuario actual
app.get('/likes', checkToken, getLikedExercises);

// Introduce favorito o borra el mismo si ya existe
app.post('/favorites/:id', checkToken, favoriteButton);

//Devuelve cantidad de favoritos por objetivo
app.get('/favorites/:id', checkToken, getFavorites);

//Obtiene los objetivos favoritos del usuario actual
app.get('/favorites', checkToken, getFavoriteWorkouts);

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
