;const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Rutas para Pacientes
router.get('/', pacienteController.getPacientes);
router.get('/new', (req, res) => {
    res.render('form-paciente', { title: 'Nuevo Paciente', action: '/pacientes', method: 'POST' });
});
router.post('/', pacienteController.createPaciente);
router.get('/:id', pacienteController.getPacienteById);
router.get('/edit/:id', pacienteController.editPaciente);
router.post('/:id', (req, res) => {
    req.method = 'PUT';
    next();
}, pacienteController.updatePaciente);
router.post('/:id/delete', (req, res) => {
    req.method = 'DELETE';
    next();
}, pacienteController.deletePaciente);

router.get('/prueba', (req, res)=>{
    res.send('prueba funcionamiento');
})

module.exports = router;