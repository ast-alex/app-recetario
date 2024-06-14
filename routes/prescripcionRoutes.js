const express = require('express');
const router = express.Router();
const prescripcionController = require('../controllers/prescripcionController');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const Paciente = require('../models/Paciente'); 
const Prescripcion = require('../models/Prescripcion');
const Profesional = require('../models/Profesional'); 
const Medicamento = require('../models/Medicamento'); 
const Presentacion = require('../models/Presentacion'); 
const Prestacion = require('../models/Prestacion'); 
const ObraSocial = require('../models/ObraSocial'); 
const Plan = require('../models/Plan');
const { createPrescriptionPDF } = require('../public/pdfGenerator');

router.get('/new/:id', prescripcionController.mostrarForm);
router.post('/', async (req, res) => {
    try {
        const { id_paciente, id_profesional_salud, diagnostico, fecha_prescripcion, vigencia, medicamentos, prestaciones } = req.body;
        // Verificar si se han prescrito medicamentos o prestaciones
        if ((!medicamentos || medicamentos.length === 0) && (!prestaciones || prestaciones.length === 0)) {
            return res.status(400).json({ message: 'Debe prescribir al menos un medicamento o una prestación.' });
        }

        // Obtener datos del paciente
        const paciente = await new Promise((resolve, reject) => {
            Paciente.getById(id_paciente, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        // Obtener datos del profesional de salud
        const profesional = await new Promise((resolve, reject) => {
            Profesional.getById(id_profesional_salud, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        // Obtener datos del plan y obra social
        const plan = await new Promise((resolve, reject) => {
            Plan.getById(paciente.id_plan, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        const obraSocial = await new Promise((resolve, reject) => {
            ObraSocial.getById(plan.id_obra_social, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        // Obtener detalles de medicamentos (si existen)
        let detailedMedicamentos = [];
        if (medicamentos && medicamentos.length > 0) {
            detailedMedicamentos = await Promise.all(medicamentos.map(async (medicamento) => {
                const presentacion = await new Promise((resolve, reject) => {
                    Presentacion.getById(medicamento.id_presentacion, (err, data) => {
                        if (err) return reject(err);
                        resolve(data);
                    });
                });

                return {
                    ...medicamento,
                    nombre_comercial: presentacion.nombre_comercial
                };
            }));   
        }else{
            'No hay medicamentos';
        }

        // Obtener detalles de prestaciones (si existen)
        let detailedPrestaciones = [];
        if (prestaciones && prestaciones.length > 0) {
            detailedPrestaciones = await Promise.all(prestaciones.map(async (prestacion) => {
                const detallePrestacion = await new Promise((resolve, reject) => {
                    Prestacion.getById(prestacion.id_prestacion, (err, data) => {
                        if (err) return reject(err);
                        resolve(data);
                    });
                });

                return {
                    ...prestacion,
                    nombre: detallePrestacion.nombre
                };
            }));
        }

        // Crear PDF
        const pdfPath = await createPrescriptionPDF({
            paciente,
            profesional,
            diagnostico,
            fecha_prescripcion,
            vigencia,
            medicamentos: detailedMedicamentos,
            prestaciones: detailedPrestaciones,
            plan,
            obraSocial
        });
        // Guardar la prescripción en la base de datos
        Prescripcion.create({
            id_paciente,
            id_profesional_salud,
            diagnostico,
            fecha_prescripcion,
            vigencia,
            medicamentos: detailedMedicamentos,
            prestaciones: detailedPrestaciones,
            pdfUrl: `/pdfs/${path.basename(pdfPath)}`
        }, (err, nuevaPrescripcion) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error al crear la prescripción' });
            }
            res.json({ message: 'Prescripción creada', pdfUrl: `/pdfs/${path.basename(pdfPath)}` });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la prescripción' });
    }
});

module.exports = router;
