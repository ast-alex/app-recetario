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
const prescripcionPrestacionController = require('../controllers/prescripcionPrestacionController');
const { checkRole, verifyToken } = require('../auth/authMiddleware');
const { createPrescriptionPDF } = require('../public/js/pdfGenerator');

router.get('/mis-prescripciones', verifyToken, checkRole([1]), prescripcionController.getByProfesional);
router.get('/new/:id', verifyToken, checkRole([1]), async (req, res) => {
  try {
    const id_paciente = req.params.id;
    const paciente = await Paciente.getById(id_paciente);
    
    if (!paciente) {
      return res.redirect('/pacientes?error_msg=Paciente no encontrado');
    }

    if(paciente.activo !== 'activo'){
      return res.redirect('/pacientes?error_msg=No se puede prescribir a un Paciente inactivo');
    }

    return prescripcionController.mostrarForm(req, res);
  } catch (error) {
    console.error('Error al obtener el paciente:', error);
    req.flash('error_msg', 'Error al obtener el paciente'); 
    return res.redirect('/pacientes?error_msg=Error al obtener el paciente');
  }
});
router.put('/:id_prescripcion_prestacion', verifyToken, checkRole([1]), (req, res) => {
    res.send('Ruta PUT funciona');
}); 
  

router.post('/', verifyToken, checkRole([1]), async (req, res) => {
  try {
    const {
      id_paciente,
      id_profesional_salud,
      diagnostico,
      vigencia_opcion,
      vigencia_custom,
      medicamentos,
      prestaciones
    } = req.body;

    console.log('Datos recibidos:', req.body);

    // Validar campos obligatorios
    if (!id_profesional_salud || !id_paciente || !diagnostico) {
      console.log('Faltan campos obligatorios');
      return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    const medicamentosArr = Array.isArray(medicamentos) ? medicamentos : [];
    const prestacionesArr = Array.isArray(prestaciones) ? prestaciones : [];

    if (medicamentosArr.length === 0 && prestacionesArr.length === 0) {
      console.log('No hay medicamentos ni prestaciones');
      return res.status(400).json({ message: 'Debe prescribir al menos un medicamento o una prestación.' });
    }

    //validar paciente 'activo'
    const paciente = await Paciente.getById(id_paciente);
    if (!paciente) {
      return res.status(400).json({ message: 'Paciente no encontrado.' });
    }
    if (paciente.activo !== 'activo') {
      return res.status(400).json({ message: 'No se puede prescribir a un Paciente inactivo.' });
    }

    const fecha_prescripcion = new Date();
    let vigenciaFinal;

     if (vigencia_opcion === 'custom') {
      if (!vigencia_custom) {
        return res.status(400).json({ message: 'Debe ingresar una vigencia personalizada.' });
      }

      const fechaCustom = new Date(vigencia_custom);
      if (isNaN(fechaCustom.getTime())) {
        return res.status(400).json({ message: 'Fecha personalizada inválida.' });
      }

      vigenciaFinal = fechaCustom;
    } else {
      const dias = parseInt(vigencia_opcion);
      if (isNaN(dias)) {
        console.error('Opción de vigencia inválida:', vigencia_opcion);
        return res.status(400).json({ message: 'Opción de vigencia inválida.' });
      }

      vigenciaFinal = new Date();
      vigenciaFinal.setHours(0, 0, 0, 0);
      vigenciaFinal.setDate(vigenciaFinal.getDate() + dias);
    }

    const profesional = await Profesional.getById(id_profesional_salud);
    const plan = await Plan.getById(paciente.id_plan);
    const obraSocial = await ObraSocial.getById(plan.id_obra_social);

    let detailedMedicamentos = [];
    if (medicamentosArr.length > 0) {
      detailedMedicamentos = await Promise.all(
        medicamentosArr.map(async (med) => {
          const presentacion = await Presentacion.getById(med.id_presentacion);
          return {
            ...med,
            nombre_comercial: presentacion.nombre_comercial,
            nombre_generico: presentacion.nombre_generico,
            concentracion: presentacion.concentracion,
            forma_farmaceutica: presentacion.forma_farmaceutica,
            cantidad_unidades: presentacion.cantidad_unidades
          };
        })
      );
    }

    let detailedPrestaciones = [];
    if (prestacionesArr.length > 0) {
      detailedPrestaciones = await Promise.all(
        prestacionesArr.map(async (pre) => {
          const detalle = await Prestacion.getById(pre.id_prestacion);
          return {
            ...pre,
            nombre: detalle.nombre
          };
        })
      );
    }

    const nuevaPrescripcion = await Prescripcion.create({
      id_paciente,
      id_profesional_salud,
      diagnostico,
      fecha_prescripcion,
      vigencia: vigenciaFinal,
      medicamentos: detailedMedicamentos,
      prestaciones: detailedPrestaciones,
      pdfUrl: ''
    });
    
    console.log('prescripción creada en la base:', nuevaPrescripcion);
    console.log('Generando PDF...');

    const pdfPath = await createPrescriptionPDF({
      
      paciente,
      profesional,
      diagnostico,
      fecha_prescripcion,
      vigencia: vigenciaFinal,
      medicamentos: detailedMedicamentos,
      prestaciones: detailedPrestaciones,
      plan,
      obraSocial
    });
    console.log('PDF generado en:', pdfPath);

    res.json({
      message: 'Prescripción creada',
      prescripcion: nuevaPrescripcion,
      pdfUrl: `/pdfs/${require('path').basename(pdfPath)}`
    });

  } catch (error) {
    console.error('Error en la ruta POST /prescripciones:', error);
    res.status(500).json({ message: 'Error al crear la prescripción' });
  }
});
router.get('/:id', verifyToken, checkRole([1]), prescripcionController.getDetailsById);


module.exports = router;
