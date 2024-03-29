# gym_API

API para la organización de entrenamientos en un gimansio.

## Comenzando :computer:

En la terminal debe instalar:

- npm install eslint prettier -D //->Instalamos el modulo de eslint y prettier

- npm install express //-> Para montar el servidor.

- npm install morgan -D //-> Para obtener mas información en consola.

- npm install mysql2 //->Para acceder a la base de datos.

- npm install dotenv //-> Para crear un archivo en la raiz del proyecto con el fin de guardar variables de entorno.

- npm install bcrypt //-> Para encriptar contraseñas.

- npm install jsonwebtoken //-> Para crear un token de incio de sesión.

- npm install sharp //-> Para procesar imágenes.

- npm install uuid //-> Para crear identificadores únicos.

- npm install nodemon -D //-> Ejecutar para no tener que parar el servidor y iniciar de manera manual el server

Se debe crear en el proyecto un fichero .eslintrc.json y otro fichero .prettierrc.json:

**.eslintrc.json**

```
{
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    }
}
```

**.prettierrc.json**

```
{
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": true,
    "singleQuote": true
}
```

En el fichero .env tiene que escribir lo siguiente:
**Conexión con la base de datos y codificación de contraseña**

```
MYSQL_HOST= Direccion del servidor.
MYSQL_USER= Nombre de usuario con acceso a la base de datos.
MYSQL_PASSWORD= Contraseña.
MYSQL_DATABASE= Nombre de la base de datos.
SECRET= Para la encriptacion de contraseñas de usuario que se guardan en la base de datos.
```

**IMPORTANTE** :warning:
Cree un fichero .gitignore para meter lo que no quieres subir al repositorio.

```
node_modules
.env
```

## Iniciar servidor

Escriba _npm run dev_ en el terminal.

## Usuario administrador

Email: admin@admin.com
Contraseña: 0010

## Autores :black_nib:

- **Guillermo** - _Goals_
- **Eliana** - _La madre de este proyecto. Sin ella, esto no sería lo que es. Ha hecho de todo._
- **Marta** - _Workouts_
- **Lykos** - _Exercises and Likes_
