const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const mostrarCampo = (valor, defecto = 'No especificado') => {
  return valor && valor.trim() !== '' ? valor : defecto;
};


const createPrescriptionPDF = async (data) => {
  const {
    paciente,
    profesional,
    diagnostico,
    fecha_prescripcion,
    vigencia,
    medicamentos,
    prestaciones,
    plan,
    obraSocial
  } = data;

  const doc = new PDFDocument();
  const pdfPath = path.join(__dirname, '..', 'pdfs', `prescripcion_${Date.now()}.pdf`);
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  doc.fontSize(20).text('Prescripción Médica', { align: 'center' });
  doc.moveDown();

  const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      console.error('Fecha inválida recibida en formatDate:', date);
      return 'Fecha inválida';
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }; 

  doc.fontSize(12).text(`Fecha de Prescripción: ${formatDate(fecha_prescripcion)}`);
  doc.text(`Vigencia hasta: ${formatDate(vigencia)}`);
  doc.moveDown();

  doc.text(`Diagnóstico: ${diagnostico}`);
  doc.moveDown();

  doc.fontSize(14).text('Información del Profesional de Salud:');
  doc.moveDown(0.5);
  doc.fontSize(12)
    .text(`Nombre: ${profesional.nombre} ${profesional.apellido}`)
    .text(`Documento: ${profesional.dni}`)
    .text(`Profesión: ${profesional.profesion}`)
    .text(`Especialidad: ${profesional.especialidad}`)
    .text(`Domicilio Profesional: ${profesional.domicilio}`)
    .text(`Matrícula: ${profesional.matricula}`)
    .moveDown();

  doc.fontSize(14).text('Información del Paciente:');
  doc.moveDown(0.5);
  doc.fontSize(12)
    .text(`Nombre: ${paciente.nombre} ${paciente.apellido}`)
    .text(`Documento: ${paciente.dni}`)
    .text(`Fecha de Nacimiento: ${formatDate(paciente.fecha_nacimiento)}`)
    .text(`Sexo: ${paciente.sexo}`)
    .text(`Obra Social: ${obraSocial.nombre}`)
    .text(`Plan: ${plan.nombre}`)
    .moveDown();

  doc.fontSize(14).text('Medicamentos Prescritos:');
  doc.moveDown(0.5);
  if (medicamentos?.length > 0) {
    medicamentos.forEach((med, i) => {
      doc.fontSize(12)
        .text(`Medicamento ${i + 1}:`)
        .text(`- Nombre Genérico: ${med.nombre_generico || 'N/A'}`)
        .text(`- Concentración: ${med.concentracion || 'N/A'}`)
        .text(`- Forma Farmacéutica: ${med.forma_farmaceutica || 'N/A'}`)
        .text(`- Cantidad: ${med.cantidad_unidades || 'N/A'}`)
        .text(`- Duración del tratamiento: ${med.duracion || 'N/A'}`)
        .text(`- Intervalo de administración: ${med.intervalo_administracion || 'N/A'}`)
        .moveDown(0.5);
    });
  } else {
    doc.text('No se han prescrito medicamentos.').moveDown();
  }

  doc.fontSize(14).text('Prestaciones Solicitadas:');
  doc.moveDown(0.5);
  if (prestaciones?.length > 0) {
    prestaciones.forEach((pre, i) => {
      doc.fontSize(12)
        .text(`Prestación ${i + 1}:`)
        .text(`- Nombre: ${pre.nombre }`)
        .text(`- Lado: ${mostrarCampo(pre.lado)}`)
        .text(`- Indicación: ${pre.indicacion}`)
        .text(`- Justificación: ${pre.justificacion}`)
        .text(`- Observación: ${mostrarCampo(pre.observacion)}`)
        .text(`- Resultado: ${mostrarCampo(pre.resultado)}`)
        .moveDown(0.5);
    });
  } else {
    doc.text('No se han prescrito prestaciones.').moveDown();
  }

  doc.moveDown(1).fontSize(10).text('Por favor, siga las indicaciones del profesional de salud. Ante cualquier duda, consulte nuevamente.');

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(pdfPath));
    stream.on('error', reject);
  });
};

module.exports = { createPrescriptionPDF };
