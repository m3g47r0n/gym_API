//Elimina ficheros.
const { unlink } = require('fs/promises');

//Sirve para crear rutas absolutas.
const path = require('path');

//Tratamiento de imagenes.
const sharp = require('sharp');

//Crea un nombre unico a un fichero subirdo.
const uuid = require('uuid');

//Da acceso a las variables.
require('dotenv').config();

//Gestión de errores
const generateError = (message, status) => {
    const error = new Error(message);
    error.httpStatus = status;
    return error
};

// Gestión de fotos.
const pictureDir = path.join(__dirname, '/img');

//Guarda la foto.
async function savePicture(picture) {

    try {
        const sharpPicture = sharp(picture.data);

        let pictureDirectory;

        const pictureName = uuid.v4() + '.jpg';

        pictureDirectory = path.join(pictureDir, pictureName);

        await sharpPicture.toFile(pictureDirectory);

        return pictureName;
    } catch (error) {
        throw new Error('Error al procesar la imagen');
    }
}

// Elimina la foto.
async function deletePicture(pictureName) {

    try {
        let picturePath;

        picturePath = path.join(pictureDir, pictureName);

        await unlink(picturePath);

    } catch (error) {
        throw new Error('Error al eliminar la imagen del servidor');
    }
}

module.exports = {

    generateError,
    savePicture,
    deletePicture

};