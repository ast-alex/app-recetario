const express = require('express');
const router = express.Router();
const prescripcionController = require('../controllers/prescripcionController');


router.get('/', prescripcionController.index);
router.post('/create', prescripcionController.create);
router.get('/buscar-paciente', prescripcionController.buscarPaciente);
router.get('/buscar-medicamento', prescripcionController.buscarMedicamento);
router.get('/buscar-prestacion', prescripcionController.buscarPrestacion);

module.exports = router;