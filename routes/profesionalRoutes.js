const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');
const { checkRole, verifyToken } = require('../auth/authMiddleware');

// Rutas para obtener todos los Profesionales de Salud
router.get('/', verifyToken, profesionalController.getAllProfesionales);

// Rutas para obtener un Profesional de Salud por ID
router.get('/:id', verifyToken, profesionalController.getProfesionalById);

// Ruta para validar un ID Refeeps
router.get('/validar-refeeps/:id_refeeps', verifyToken, profesionalController.validarRefeps);

// Rutas para crear un Profesional de Salud
router.post('/crear', verifyToken, checkRole([2]), profesionalController.createProfesional);

module.exports = router;