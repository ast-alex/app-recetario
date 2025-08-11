;const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../auth/authMiddleware');
const pacienteController = require('../controllers/pacienteController');

// Rutas para Pacientes
router.get('/', verifyToken, checkRole([1,2]), pacienteController.getPacientes);
router.get('/new', verifyToken, checkRole([1,2]), (req, res) => {
    res.render('form-paciente', { title: 'Nuevo Paciente', action: '/pacientes', method: 'POST', volverLista: true });
});
router.post('/', verifyToken, checkRole([1,2]), pacienteController.createPaciente);
router.get('/:id', verifyToken, checkRole([1,2]), pacienteController.getPacienteById);
router.get('/edit/:id', verifyToken, checkRole([1,2]), pacienteController.editPaciente);
router.put('/:id', verifyToken, checkRole([1,2]), pacienteController.updatePaciente);
router.put('/:id/estado', verifyToken, checkRole([1,2]), pacienteController.toggleEstado);
router.get('/buscar', verifyToken, checkRole([1,2]), pacienteController.buscarPacienteDni);

module.exports = router;