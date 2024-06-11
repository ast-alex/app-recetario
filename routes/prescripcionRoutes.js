const express = require('express');
const router = express.Router();
const prescripcionController = require('../controllers/prescripcionController');
const Prescripcion = require('../models/Prescripcion');

router.get('/new/:id', prescripcionController.mostrarForm);
router.post('/', prescripcionController.crearPrescripcion);
router.get('/', (req, res) => {
    Prescripcion.getAll((error, prescripciones) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(prescripciones); 
        }
    });
});

module.exports = router;