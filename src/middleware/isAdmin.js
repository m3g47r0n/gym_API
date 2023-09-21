module.exports = (req, res, next) => {
  try {
    if (req.authUser.id === 1) {
      return next();
    }
  } catch (err) {
    res.status(403);
    res.send('Acceso no autorizado');
  }
};
