const Paciente = require('../models/Paciente');
const Prescripcion = require('../models/Prescripcion');
const Profesional = require('../models/Profesional');
const Medicamento = require('../models/Medicamento');
const Presentacion = require('../models/Presentacion');
const Prestacion = require('../models/Prestacion');

exports.mostrarForm = (req, res) => {
    const id_paciente = req.params.id;
    Paciente.getById(id_paciente, (error, paciente) => {
        if(error) {
            res.status(500).send(error);
        } else {
            Medicamento.getAll((error, medicamentos) => {
                if(error) {
                    res.status(500).send(error);
                } else {
                    Presentacion.getAll((error, presentaciones) => {
                        if(error) {
                            res.status(500).send(error);
                        } else {
                            Prestacion.getAll((error, prestaciones) => {
                                if(error) {
                                    res.status(500).send(error);
                                } else {
                                    res.render('form-prescripcion', {paciente, medicamentos, presentaciones, prestaciones});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};
    
exports.crearPrescripcion = (req, res) => {
    const { id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia } = req.body;

    const medicamentos = req.body.medicamentos.id_presentacion.map((id_presentacion, index) => {
        return {
            id_presentacion: id_presentacion,
            dosis: req.body.medicamentos.dosis[index],
            duracion: req.body.medicamentos.duracion[index],
            intervalo_administracion: req.body.medicamentos.intervalo_administracion[index]
        };
    });

    const prestaciones = req.body.prestaciones.id_prestacion.map((id_prestacion, index) => {
        return {
            id_prestacion: id_prestacion,
            observacion: req.body.prestaciones.observacion[index],
            resultado: req.body.prestaciones.resultado[index]
        };
    });

    Prescripcion.create({ id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia, medicamentos, prestaciones }, (error, results) => {
        if(error) {
            res.status(500).send(error);
        } else {
            res.redirect('/prescripciones');
        }
    });
};


