const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token =  req.cookies.token;

    if (!token) return manejarAccesoNoAutorizado(req, res, req.method);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return manejarAccesoNoAutorizado(req, res, req.method);
    }
};

const manejarAccesoNoAutorizado = (req, res, metodo) => {
  res.clearCookie('token');

  const aceptaJson = req.headers.accept?.includes('application/json') || req.xhr;
  const esFetch = req.headers['x-solicitud-fetch'] === 'true';

  if (aceptaJson ||  esFetch || metodo !== 'GET') {
    return res.status(401).json({ success: false, message: 'Sesión expirada' });
  }

  return res.redirect('/auth/login?expired=true');
};

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect('/login');
        }

        if (!roles.includes(req.user.id_rol)) {
            return res.redirect('/home?denegado=1');
        }
        next();
    };
};


module.exports = { verifyToken, checkRole };