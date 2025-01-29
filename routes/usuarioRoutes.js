const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { checkRole, verifyToken } = require('../auth/authMiddleware');
const Usuario = require('../models/Usuario');

// ruta para crear un usuario(ADMIN) GET para mostrar el formulario y POST para crear
router.get('/crear-admin', (req, res) => {
    Usuario.getAllAdmin((err, usuarios) => {
        if (err) {
            console.error("Error al obtener los usuarios:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        const mensajeExito = req.query.success ? "Usuario creado con exito!!" : null;
        res.render('form-admin', { usuarios, mensajeExito });
    })
});
router.post('/crear-admin', verifyToken, checkRole([2]), usuarioController.createAdmin);

module.exports = router;