const express = require('express');
const router = express.Router();
const profesionalController = require('../controllers/profesionalController');
const { checkRole, verifyToken } = require('../auth/authMiddleware');
const ProfesionalSalud = require('../models/Profesional');


// Rutas para obtener todos los Profesionales de Salud
router.get('/', verifyToken, profesionalController.getAllProfesionales);

// // Rutas para obtener un Profesional de Salud por ID
// router.get('/:id', verifyToken, profesionalController.getProfesionalById);

// Ruta para validar un ID Refeeps
router.get('/validar-refeeps/:id_refeeps', verifyToken, profesionalController.validarRefeps);

// Rutas para crear un Profesional de Salud GET para mostrar el formulario y POST para crear
router.get('/crear', (req, res) => {
    ProfesionalSalud.getAll((err, profesionales) => {
        if (err) {
            console.error("Error al obtener los profesionales de salud:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
        const mensajeExito = req.query.success ? "Profesional de salud creado con exito!!" : null;
        res.render('form-profesional', { profesionales , mensajeExito });
    })
});
router.post('/crear', verifyToken, checkRole([2]), profesionalController.createProfesional);

module.exports = router;