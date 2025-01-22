const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// ruta para crear un usuario(ADMIN)]
router.post('/crear-admin', usuarioController.createAdmin);

module.exports = router;