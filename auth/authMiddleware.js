const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

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
        const token = req.header('Authorization')?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;  // Guardamos la información del usuario decodificada en el objeto `req.user`
            
            if (!roles.includes(req.user.id_rol)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next(); // El usuario tiene el rol adecuado, procedemos con la solicitud
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
};

module.exports = { verifyToken, checkRole };