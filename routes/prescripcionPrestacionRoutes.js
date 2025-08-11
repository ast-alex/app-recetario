const express = require('express');
const router = express.Router();
const prescripcionPrestacionController = require('../controllers/prescripcionPrestacionController');
const {verifyToken , checkRole} = require('../auth/authMiddleware');

router.put('/:id_prescripcion_prestacion', verifyToken, checkRole([1]), prescripcionPrestacionController.registrarResultadoYObservacion);

module.exports = router;