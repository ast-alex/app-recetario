const express = require('express');
const router = express.Router();
const loginController = require('../auth/loginController');
const verifyToken = require('../auth/authMiddleware');
const jwt = require('jsonwebtoken');

// Ruta para mostrar la vista de login
router.get('/login', (req, res) => {
    console.log('Recibida solicitud de login');
    res.render('login', { error: null }); // Renderizar el formulario de login
});

// Ruta para iniciar sesión
router.post('/login', loginController.login);

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Eliminar el token de la cookie
    res.redirect('/auth/login'); // Redirigir a la página de inicio de sesión
});

module.exports = router;
