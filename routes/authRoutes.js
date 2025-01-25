const express = require('express');
const router = express.Router();
const loginController = require('../auth/loginController');
const verifyToken = require('../auth/authMiddleware');
const jwt = require('jsonwebtoken');

// Ruta para mostrar la vista de login
router.get('/login', (req, res) => {
    res.render('login', { error: null }); // Renderizar el formulario de login
});

// Ruta para iniciar sesión
router.post('/login', loginController.login);

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Eliminar el token de la cookie
    res.redirect('/login'); // Redirigir a la página de inicio de sesión
});

// router.get('/home', (req, res) => {
//     //verificar si hay token
//     const token = req.cookies.token;

//     if(!token){
//         return res.redirect('/login');
//     }

//     try{
//         //verificar el token
//         jwt.verify(token, process.env.JWT_SECRET);
//         // Si el token es valido, renderizo la vista de home(principal)
//         res.render('home', { message: 'Bienvenido al sistema' });
//     }catch(error){
//         console.log('Error al verificar el token', error);
//         return res.redirect('/login');
//     }
// })


module.exports = router;
