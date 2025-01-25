const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { checkRole, verifyToken } = require('../auth/authMiddleware');

// ruta para crear un usuario(ADMIN)]
router.post('/crear-admin', verifyToken, checkRole([2]), usuarioController.createAdmin);

module.exports = router;