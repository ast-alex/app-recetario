const Paciente = require('../models/Paciente');
const Prescripcion = require('../models/Prescripcion');
const Profesional = require('../models/Profesional');
const Medicamento = require('../models/Medicamento');
const Presentacion = require('../models/Presentacion');
const Prestacion = require('../models/Prestacion');
const PrescripcionPrestacion = require('../models/prescripcionPrestacion');
const pdfGenerator = require('../public/js/pdfGenerator');
const jwt = require('jsonwebtoken');

exports.mostrarForm = async (req, res) => {
  try {
    const id_usuario = getUserIdFromToken(req);
    const id_paciente = req.params.id;

    const profesional = await Profesional.getByUserId(id_usuario);
    if (!profesional) return res.status(404).send('Profesional de salud no encontrado');

    const fullName = `${profesional.nombre} ${profesional.apellido}`;

    const paciente = await Paciente.getById(id_paciente);
    const medicamentos = await Medicamento.getAll();
    const presentaciones = await Presentacion.getAllPresentaciones();
    const prestaciones = await Prestacion.getAll();
    const prescripcionesAnteriores = await Prescripcion.getAllByPaciente(id_paciente);
    
    for(const prescripcion of prescripcionesAnteriores){
      prescripcion.prestaciones = await PrescripcionPrestacion.findWithNombreByPrescripcion(prescripcion.id_prescripcion);
    }

    res.render('form-prescripcion', {
      fullName,
      profesional,
      paciente,
      medicamentos,
      presentaciones,
      prestaciones,
      prescripcionesAnteriores
    });
  } catch (error) {
    console.error('Error en mostrarForm:', error);
    res.status(500).send('Error al renderizar el formulario');
  }
};

exports.crearPrescripcion = async (req, res) => {
  try {
    const id_usuario = getUserIdFromToken(req);

    // Obtener profesional para validar
    const profesional = await Profesional.getByUserId(id_usuario);
    if (!profesional) {
      return res.status(403).json({ error: 'Usuario no autorizado' });
    }

    // Extraer datos de req.body
    const { id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia, medicamentos, prestaciones } = req.body;

    // Validar campos obligatorios
    if (!id_profesional_salud || !id_paciente || !diagnostico || !fecha_prescripcion || !vigencia) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    // Validar que medicamentos y prestaciones sean arrays (o asignar arrays vacíos)
    const medicamentosArr = Array.isArray(medicamentos) ? medicamentos : [];
    const prestacionesArr = Array.isArray(prestaciones) ? prestaciones : [];

    // Armar datos de prescripción
    const prescripcionData = {
      id_profesional_salud,
      id_paciente,
      diagnostico,
      fecha_prescripcion,
      vigencia,
      medicamentos: medicamentosArr,
      prestaciones: prestacionesArr,
    };

    // Crear la prescripción
    const prescripcion = await Prescripcion.create(prescripcionData);

    // Generar PDF
    const pdfPath = await pdfGenerator.createPrescriptionPDF(prescripcion);
    
    const pdfUrl = `/pdfs/prescripcion_${prescripcion.id_prescripcion}.pdf`;
    
    res.json({ prescripcion, pdfUrl });
   

  } catch (error) {
    console.error('Error en crearPrescripcion:', error);
    res.status(500).send('Error interno al crear la prescripción');
  }
};

exports.getByProfesional = async (req, res) => {
  
  try {
    const profesional = await Profesional.getByUserId(req.user.id_usuario);

    if (!profesional) {
      return res.status(404).send('Profesional de salud no encontrado');
    }
    
    const id_profesional_salud = profesional.id_profesional_salud;
  
    const prescripciones = await Prescripcion.getProfesionalId(id_profesional_salud);
    res.render('prescripciones-prof', { prescripciones });
  } catch (error) {
    console.error('Error en getByProfesional:', error);
    res.status(500).send('Error al obtener las prescripciones');
  }
};

exports.getDetailsById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const prescripcion = await Prescripcion.getDetailsById(id);
    res.render('detalles-prescripcion', { prescripcion });
  } catch (error) {
    console.error('Error en getDetailsById:', error);
    res.status(500).send('Error al obtener los detalles de la prescripción');
  }
};


// Función para extraer el id_usuario del token (mantener igual)
function getUserIdFromToken(req) {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    throw new Error('Token no proporcionado');
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken.id_usuario;
}
