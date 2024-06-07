const pool = require('../config/database');

async function create({ id_profesional_salud, id_paciente, diagnostico }) {
    const [result] = await pool.query('INSERT INTO Prescripcion (id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion) VALUES (?, ?, ?, NOW())', [id_profesional_salud, id_paciente, diagnostico]);
    return { id: result.insertId };
}

async function addMedicamento(id_prescripcion, medicamento) {
    const { presentacion_id, dosis, duracion, intervalo_administracion } = medicamento;
    await pool.query('INSERT INTO Prescripcion_Medicamento (id_prescripcion, presentacion_id, dosis, duracion, intervalo_administracion) VALUES (?, ?, ?, ?, ?)', [id_prescripcion, presentacion_id, dosis, duracion, intervalo_administracion]);
}

async function addPrestacion(id_prescripcion, prestacion) {
    const { id_prestacion, observacion, resultado } = prestacion;
    await pool.query('INSERT INTO Prescripcion_Prestacion (id_prescripcion, id_prestacion, observacion, resultado) VALUES (?, ?, ?, ?)', [id_prescripcion, id_prestacion, observacion, resultado]);
}

module.exports = {
    create,
    addMedicamento,
    addPrestacion
};
