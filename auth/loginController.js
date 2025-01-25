const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        // buscar usuario por email
        const usuario = await Usuario.getByEmail(email);

        if (!usuario) {
            return res.status(400).json({ error: 'Usuario no encontrado.' });
        }

        //comparar password con la base de datos
        const isMatch = password === usuario.password;

        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta.' });
        }

        // Generar token JWT
        const payload = {
            id_usuario: usuario.id_usuario,
            email: usuario.email,
            id_rol: usuario.id_rol
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Guardar token en localStorage
        res.cookie('token', token, { httpOnly: true });

        // Redirigir a la vista de inicio(home)
        return res.redirect('/home');
        

    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al buscar el usuario.' });
    }
}

module.exports = { login };