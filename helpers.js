
//Da acceso a las variables.
require('dotenv').config();

//Gestión de errores
const generateError = (message, status) => {
    const error = new Error(message);
    error.httpStatus = status;
    return error
};


module.exports = {
    generateError
};