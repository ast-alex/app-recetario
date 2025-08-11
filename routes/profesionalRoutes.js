const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');
const { checkRole, verifyToken } = require('../auth/authMiddleware');
const ProfesionalSalud = require('../models/Profesional');

// Rutas para obtener todos los Profesionales de Salud
router.get('/', verifyToken, checkRole([2]), profesionalController.getAllProfesionales);

// Ruta para validar un ID Refeeps
router.get('/validar-refeeps/:id_refeeps', verifyToken, checkRole([2]), profesionalController.validarRefeps);
router.get('/consultar-refeeps', verifyToken, checkRole([2]), (req, res) => {
  res.render('consultar-refeeps');
})

// Ruta para crear un Profesional de Salud - GET mostrar formulario con lista
router.get('/crear', verifyToken, checkRole([2]), async (req, res) => {
  try {
    const profesionales = await ProfesionalSalud.getAll(); // migrar este método a Promise también
    const mensajeExito = req.query.success ? "Profesional de salud creado con éxito!!" : null;
    res.render('form-profesional', { profesionales, mensajeExito });
  } catch (error) {
    console.error("Error al obtener los profesionales de salud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put('/:id', verifyToken, checkRole([2]), profesionalController.updateEstadoProfesional);

router.put('/editar-campos/:id', verifyToken, checkRole([2]), profesionalController.updateCamposProfesional);

router.post('/crear', verifyToken, checkRole([2]), profesionalController.createProfesional);

module.exports = router;
