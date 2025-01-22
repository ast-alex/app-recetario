const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');

// Rutas para obtener todos los Profesionales de Salud
router.get('/', profesionalController.getAllProfesionales);

// Rutas para obtener un Profesional de Salud por ID
router.get('/:id', profesionalController.getProfesionalById);

// Ruta para validar un ID Refeeps
router.get('/validar-refeeps/:id_refeeps', profesionalController.validarRefeps);

module.exports = router;