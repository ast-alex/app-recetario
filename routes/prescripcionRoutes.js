const express = require('express');
const router = express.Router();
const prescripcionController = require('../controllers/prescripcionController');

router.get('/buscar-paciente', prescripcionController.buscarPaciente);
router.post('/buscar-paciente', prescripcionController.buscarPacientePost);

module.exports = router;