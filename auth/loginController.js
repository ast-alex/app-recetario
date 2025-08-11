const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).render('login', { error: 'Todos los campos son obligatorios.' });
    }

    try {
        // buscar usuario por email
        const usuario = await Usuario.getByEmail(email);

        if (!usuario) {
            return res.status(400).render( 'login', { error: 'Usuario no encontrado.' });
        }

        if (!usuario.password) {
            console.error('Password no definido para el usuario:', usuario);
            return res.status(500).render( 'login', { error: 'Error interno. Contraseña no registrada.' });
        }

        //comparar password con la base de datos
        const isMatch = await bycrpt.compare(password, usuario.password);

        if (!isMatch) {
            return res.status(400).render( 'login', { error: 'Contraseña incorrecta.' });
        }

        // Generar token JWT
        const payload = {
            id_usuario: usuario.id_usuario,
            email: usuario.email,
            id_rol: usuario.id_rol
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Guardar token en cookie
        res.cookie('token', token, { httpOnly: true });

        // Redirigir a la vista de inicio(home)
        return res.redirect('/home?success=1');
        
    }catch (error) {
        console.error(error);
        return res.status(500).render( 'login', { error: 'Error al buscar el usuario.' });
    }
}

module.exports = { login };