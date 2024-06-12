const express = require('express');
const router = express.Router();
const prescripcionController = require('../controllers/prescripcionController');
const Prescripcion = require('../models/Prescripcion');

router.get('/new/:id', prescripcionController.mostrarForm);
router.post('/', (req, res) => {
    const data = req.body;

    if (!Array.isArray(data.medicamentos)) {
        data.medicamentos = [];
    }

    if (!Array.isArray(data.prestaciones)) {
        data.prestaciones = [];
    }

    Prescripcion.create(data, (error, prescripcion) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(prescripcion);
        }
    });
});


module.exports = router;