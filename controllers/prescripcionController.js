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

    // Validar campos requeridos
    if (!id_profesional_salud || !id_paciente || !diagnostico || !fecha_prescripcion || !vigencia) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    // Verificar si medicamentos y prestaciones son arrays
    const medicamentos = Array.isArray(req.body['medicamentos[id_presentacion][]']) ? req.body['medicamentos[id_presentacion][]'].map((id_presentacion, index) => ({
        id_presentacion: id_presentacion,
        concentracion: req.body['medicamentos[concentracion][]'][index],
        cantidad_unidades: req.body['medicamentos[cantidad_unidades][]'][index],
        id_forma_farmaceutica: req.body['medicamentos[id_forma_farmaceutica][]'][index],
        duracion: req.body['medicamentos[duracion][]'][index],
        intervalo_administracion: req.body['medicamentos[intervalo_administracion][]'][index]
    })) : [];

    const prestaciones = Array.isArray(req.body['prestaciones[id_prestacion][]']) ? req.body['prestaciones[id_prestacion][]'].map((id_prestacion, index) => ({
        id_prestacion: id_prestacion,
        lado: req.body['prestaciones[lado][]'][index],
        indicacion: req.body['prestaciones[indicacion][]'][index],
        justificacion: req.body['prestaciones[justificacion][]'][index],
        observacion: req.body['prestaciones[observacion][]'][index],
        resultado: req.body['prestaciones[resultado][]'][index]
    })) : [];

    const prescripcionData = { 
        id_profesional_salud, 
        id_paciente, 
        diagnostico, 
        fecha_prescripcion, 
        vigencia, 
        medicamentos, 
        prestaciones 
    };

    Prescripcion.create(prescripcionData, (error, prescripcion) => {
        if (error) {
            console.error('Error al crear la prescripción:', error);
            return res.status(500).send('Error interno al crear la prescripción');
        }

        // Generar el PDF
        pdfGenerator.createPrescriptionPDF(prescripcion, (err, pdfPath) => {
            if (err) {
                console.error('Error al generar el PDF:', err);
                return res.status(500).send('Error interno al generar el PDF');
            }

            const pdfUrl = `/pdfs/prescripcion_${prescripcion.id_prescripcion}.pdf`;
            res.json({ prescripcion, pdfUrl });
        });
    });
};
