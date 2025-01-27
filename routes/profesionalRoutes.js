const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');
const { checkRole, verifyToken } = require('../auth/authMiddleware');

// Rutas para obtener todos los Profesionales de Salud
router.get('/', verifyToken, profesionalController.getAllProfesionales);

// // Rutas para obtener un Profesional de Salud por ID
// router.get('/:id', verifyToken, profesionalController.getProfesionalById);

// Ruta para validar un ID Refeeps
router.get('/validar-refeeps/:id_refeeps', verifyToken, profesionalController.validarRefeps);

// Rutas para crear un Profesional de Salud GET para mostrar el formulario y POST para crear
router.get('/crear', (req, res) => {
    res.render('form-profesional')
});
router.post('/crear', verifyToken, checkRole([2]), profesionalController.createProfesional);

module.exports = router;