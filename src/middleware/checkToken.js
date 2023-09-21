const jwt = require('jsonwebtoken');
const { generateError } = require('./helpers');

module.exports = (req, res, next) => {
  try {
    //Extraemos authorization de req.headers en caso que existiese
    const { authorization } = req.headers;

    //Comprobamos si se envió authorization en los headers
    if (!authorization) {
      throw generateError('Falta de autorización', 400);
    } else {
      const tokenInfo = jwt.verify(authorization, process.env.SECRET);

      //Introducimos el contenido del token en una nueva variable
      req.authUser = tokenInfo;

      //Pasamos el control al siguiente middleware, en este caso a la función callback de la ruta
      next();
    }
  } catch (err) {
    res.status(401);
    res.send('Usuario no registrado');
  }
};
