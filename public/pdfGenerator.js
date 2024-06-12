const PDFDocument = require('pdfkit');
const fs = require('fs');

// Función para generar el PDF
function generarPDF(prescripcion, callback) {
    // Crear un nuevo documento PDF
    const doc = new PDFDocument();

    // Nombre del archivo PDF con el id_prescripcion
    const fileName = `prescripcion_${prescripcion.id_prescripcion}.pdf`;
    const filePath = `./pdfs/${fileName}`;

    // Crear el PDF y guardarlo en el servidor
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(18).text('Prescripción Médica', { align: 'center' }).moveDown(0.5);

    // Aquí puedes añadir más contenido al PDF según tus necesidades
    doc.fontSize(12).text(`Fecha de Prescripción: ${prescripcion.fecha_prescripcion}`);
    doc.text(`Diagnóstico: ${prescripcion.diagnostico}`);
    doc.text(`Vigencia: ${prescripcion.vigencia}`);

    // Ejemplo de cómo agregar los medicamentos y prestaciones
    doc.fontSize(14).text('Medicamentos', { underline: true }).moveDown(0.5);
    prescripcion.medicamentos.forEach((medicamento, index) => {
        doc.text(`${index + 1}. ${medicamento.nombre_comercial}`);
        doc.text(`   Dosis: ${medicamento.dosis}`);
        doc.text(`   Duración: ${medicamento.duracion}`);
        doc.text(`   Intervalo de Administración: ${medicamento.intervalo_administracion}`);
        doc.moveDown(0.5);
    });

    doc.fontSize(14).text('Prestaciones', { underline: true }).moveDown(0.5);
    prescripcion.prestaciones.forEach((prestacion, index) => {
        doc.text(`${index + 1}. ${prestacion.nombre}`);
        doc.text(`   Observación: ${prestacion.observacion}`);
        doc.text(`   Resultado: ${prestacion.resultado}`);
        doc.moveDown(0.5);
    });

    // Finalizar y cerrar el documento PDF
    doc.end();

    // Devolver el nombre del archivo generado
    callback(null, fileName);
}

module.exports = {
    generarPDF
};
