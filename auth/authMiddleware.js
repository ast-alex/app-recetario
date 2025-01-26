const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token =  req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Acceso no autorizado' });
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        // req.user ya debe estar definido por verifyToken
        if (!req.user || !roles.includes(req.user.id_rol)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = { verifyToken, checkRole };