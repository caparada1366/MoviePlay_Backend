const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);

    if (!token)
      return res.status(401).json({ message: "No token, Autorizacion Denegada" });

    jwt.verify(token, 'hiddentoken', (error, usuario) => {
      if (error) {
        return res.status(401).json({ message: "El token no es valido" });
      }
      req.usuario = usuario;
      next();
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = authUser;