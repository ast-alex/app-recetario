const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const createPrescriptionPDF = async (data) => {
    const { paciente, profesional, diagnostico, fecha_prescripcion, vigencia, medicamentos, prestaciones, plan, obraSocial } = data;

    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, '..', 'pdfs', `prescripcion_${Date.now()}.pdf`);

    // Crear flujo de escritura
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // Añadir contenido al PDF
    doc.fontSize(20).text('Prescripción Médica', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Fecha: ${new Date(fecha_prescripcion).toDateString()}`);
    doc.moveDown();
    doc.text(`Diagnóstico: ${diagnostico}`);
    doc.moveDown();
    doc.text(`Vigencia: ${new Date(vigencia).toDateString()}`);
    doc.moveDown();

    // Información del profesional de salud
    doc.fontSize(14).text('Información del Profesional de Salud:');
    doc.moveDown();
    doc.fontSize(12).text(`Nombre: ${profesional.nombre} ${profesional.apellido}`);
    doc.text(`Documento: ${profesional.dni}`);
    doc.text(`Profesión: ${profesional.profesion}`);
    doc.text(`Especialidad: ${profesional.especialidad}`);
    doc.text(`Domicilio: ${profesional.domicilio}`);
    doc.text(`Matrícula: ${profesional.matricula}`);
    doc.moveDown();

    // Información del paciente
    doc.fontSize(14).text('Información del Paciente:');
    doc.moveDown();
    doc.fontSize(12).text(`Nombre: ${paciente.nombre} ${paciente.apellido}`);
    doc.text(`Documento: ${paciente.dni}`);
    doc.text(`Fecha de Nacimiento: ${new Date(paciente.fecha_nacimiento).toDateString()}`);
    doc.text(`Sexo: ${paciente.sexo}`);
    doc.text(`Obra Social: ${obraSocial.nombre}`);
    doc.text(`Plan: ${plan.nombre}`);
    doc.moveDown();

    // Medicamentos
    doc.fontSize(14).text('Medicamentos:');
    doc.moveDown();
    if (medicamentos && medicamentos.length > 0) {
      medicamentos.forEach((medicamento, index) => {
          doc.text(`Medicamento ${index + 1}:`);
          doc.text(`Nombre Comercial: ${medicamento.nombre_comercial}`);
          doc.text(`Duración: ${medicamento.duracion}`);
          doc.text(`Intervalo de Administración: ${medicamento.intervalo_administracion}`).moveDown(0.5);
      });
    } else {
      doc.text('No se han prescrito medicamentos.').moveDown(0.5);
    }


    // Prestaciones
    doc.fontSize(14).text('Prestaciones:');
    doc.moveDown();
    if (prestaciones && prestaciones.length > 0) {
      prestaciones.forEach((prestacion, index) => {
          doc.text(`Prestación ${index + 1}:`);
          doc.text(`Nombre: ${prestacion.nombre}`);
          doc.text(`Lado: ${prestacion.lado}`);
          doc.text(`Indicación: ${prestacion.indicacion}`);
          doc.text(`Justificación: ${prestacion.justificacion}`);
          doc.text(`Observación: ${prestacion.observacion}`);
          doc.text(`Resultado: ${prestacion.resultado}`).moveDown(0.5);
      });
    } else {
      doc.text('No se han prescrito prestaciones.').moveDown(0.5);
    }

    // Finalizar y cerrar el PDF
    doc.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', () => {
            resolve(pdfPath);
        });
        stream.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = { createPrescriptionPDF };
