const Paciente = require('../models/Paciente');
const Prescripcion = require('../models/Prescripcion');
const Profesional = require('../models/Profesional');
const Medicamento = require('../models/Medicamento');
const Presentacion = require('../models/Presentacion');
const Prestacion = require('../models/Prestacion');
const pdfGenerator = require('../public/pdfGenerator');

exports.mostrarForm = (req, res) => {
    const id_paciente = req.params.id;
    Paciente.getById(id_paciente, (error, paciente) => {
        if (error) {
            return res.status(500).send(error);
        }
        // Obtener todos los medicamentos disponibles
        Medicamento.getAll((error, medicamentos) => {
            if (error) {
                return res.status(500).send(error);
            }
            // Obtener todas las presentaciones disponibles
            Presentacion.getAllPresentaciones((error, presentaciones) => {
                if (error) {
                    return res.status(500).send(error);
                }
                // Obtener todas las prestaciones disponibles
                Prestacion.getAll((error, prestaciones) => {
                    if (error) {
                        return res.status(500).send(error);
                    }
                    // Renderizar el formulario con los datos obtenidos
                    res.render('form-prescripcion', {
                        paciente,
                        medicamentos,
                        presentaciones,
                        prestaciones
                    });
                });
            });
        });
    });
};
    
exports.crearPrescripcion = (req, res) => {
    const { id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia } = req.body;

    // Obtener los medicamentos seleccionados
    const medicamentos = req.body.medicamentos.id_presentacion.map((id_presentacion, index) => {
        return {
            id_presentacion: id_presentacion,
            concentracion: req.body.medicamentos.concentracion[index],
            cantidad_unidades: req.body.medicamentos.cantidad_unidades[index],
            id_forma_farmaceutica: req.body.medicamentos.id_forma_farmaceutica[index],
            duracion: req.body.medicamentos.duracion[index],
            intervalo_administracion: req.body.medicamentos.intervalo_administracion[index]
        };
    });

    // Obtener las prestaciones seleccionadas
    const prestaciones = req.body.prestaciones.id_prestacion.map((id_prestacion, index) => {
        return {
            id_prestacion: id_prestacion,
            observacion: req.body.prestaciones.observacion[index],
            resultado: req.body.prestaciones.resultado[index]
        };
    });

    // Crear la prescripción con los datos recopilados
    Prescripcion.create({ id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia, medicamentos, prestaciones }, (error, prescripcion) => {
        if (error) {
            res.status(500).send(error);
        } else {
            // Llamar a la función para generar el PDF
            pdfGenerator.generarPDF(prescripcion, (err, fileName) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    // Devolver el nombre del archivo PDF generado o cualquier otra respuesta necesaria
                    res.json({ message: 'Prescripción guardada exitosamente', pdf: fileName });
                }
            });
        }
    });
};

