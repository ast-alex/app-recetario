const pool = require('../config/config');

class Prescripcion {
  constructor(id_prescripcion, id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia) {
    this.id_prescripcion = id_prescripcion;
    this.id_profesional_salud = id_profesional_salud;
    this.id_paciente = id_paciente;
    this.diagnostico = diagnostico;
    this.fecha_prescripcion = fecha_prescripcion;
    this.vigencia = vigencia;
  }

  static async create(data) {
    const { id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia, medicamentos, prestaciones } = data;

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        'INSERT INTO prescripcion (id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia) VALUES (?, ?, ?, ?, ?)',
        [id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia]
      );

      const id_prescripcion = result.insertId;

      // Insertar medicamentos
      for (const medicamento of medicamentos || []) {
        const { id_presentacion, duracion, intervalo_administracion } = medicamento;
        await connection.query(
          'INSERT INTO prescripcion_medicamento (id_prescripcion, id_presentacion, duracion, intervalo_administracion) VALUES (?, ?, ?, ?)',
          [id_prescripcion, id_presentacion, duracion, intervalo_administracion]
        );
      }

      // Insertar prestaciones
      for (const prestacion of prestaciones || []) {
        const { id_prestacion, lado, indicacion, justificacion, observacion, resultado } = prestacion;
        await connection.query(
          'INSERT INTO prescripcion_prestacion (id_prescripcion, id_prestacion, lado, indicacion, justificacion, observacion, resultado) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [id_prescripcion, id_prestacion, lado, indicacion, justificacion, observacion, resultado]
        );
      }

      await connection.commit();

      // Traer prescripción con detalles para devolver
      const prescripcion = await this.getDetailsById(id_prescripcion);
      return prescripcion;

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getProfesionalId(id_profesional_salud) {
    const [rows] = await pool.query(`
      SELECT 
        p.id_prescripcion, p.fecha_prescripcion,
        pp.id_prescripcion_prestacion,
        pp.resultado, 
        pp.observacion,
        pr.nombre AS nombre_prestacion,
        pa.id_paciente, pa.nombre AS nombre_paciente, pa.apellido AS apellido_paciente
      FROM prescripcion p
      LEFT JOIN prescripcion_prestacion pp ON p.id_prescripcion = pp.id_prescripcion
      LEFT JOIN prestacion pr ON pp.id_prestacion = pr.id_prestacion
      JOIN paciente pa ON p.id_paciente = pa.id_paciente
      WHERE p.id_profesional_salud = ?
      ORDER BY p.fecha_prescripcion DESC
    `, [id_profesional_salud]);

    const agrupadas = [];

    for (const row of rows){
      let prescripcion = agrupadas.find(p => p.id_prescripcion == row.id_prescripcion);
      if(!prescripcion){
        prescripcion={
          id_prescripcion: row.id_prescripcion,
          fecha_prescripcion: row.fecha_prescripcion,
            id_paciente: row.id_paciente,
            nombre_paciente: row.nombre_paciente,
            apellido_paciente: row.apellido_paciente,
          prestaciones: [],
          medicamentos: []
        };
        agrupadas.push(prescripcion);
      }
      if(row.resultado !== null || row.observacion !== null){
        prescripcion.prestaciones.push({
          id_prescripcion_prestacion: row.id_prescripcion_prestacion,
          resultado: row.resultado,
          observacion: row.observacion,
          nombre: row.nombre_prestacion
        });
      }
    }
    return agrupadas;
  }


  static async getDetailsById(id_prescripcion) {
    const queryPrescripcion = `
      SELECT p.id_prescripcion, p.fecha_prescripcion, p.diagnostico, p.vigencia,
             ps.nombre AS nombre_profesional, ps.apellido AS apellido_profesional, ps.dni AS documento_profesional,
             ps.profesion, ps.especialidad, ps.domicilio AS domicilio_profesional, ps.matricula,
             pa.nombre AS nombre_paciente, pa.apellido AS apellido_paciente, pa.dni AS documento_paciente,
             pa.fecha_nacimiento, pa.sexo, os.nombre AS obra_social, pl.nombre AS plan
      FROM prescripcion p
      JOIN profesional_salud ps ON p.id_profesional_salud = ps.id_profesional_salud
      JOIN paciente pa ON p.id_paciente = pa.id_paciente
      JOIN plan pl ON pa.id_plan = pl.id_plan
      JOIN obrasocial os ON pl.id_obra_social = os.id_obra_social
      WHERE p.id_prescripcion = ?
    `;

    const queryMedicamentos = `
      SELECT pm.id_prescripcion_medicamento, pm.duracion, pm.intervalo_administracion, pr.nombre_comercial,
             pr.cantidad_unidades, me.nombre_generico, co.valor AS concentracion, ff.nombre AS forma_farmaceutica
      FROM prescripcion_medicamento pm
      JOIN presentacion pr ON pm.id_presentacion = pr.id_presentacion
      JOIN medicamento me ON pr.id_medicamento = me.id_medicamento
      JOIN concentracion co ON pr.id_concentracion = co.id_concentracion
      JOIN forma_farmaceutica ff ON pr.id_forma_farmaceutica = ff.id_forma_farmaceutica
      WHERE pm.id_prescripcion = ?
    `;

    const queryPrestaciones = `
      SELECT pp.id_prescripcion_prestacion, pp.indicacion, pp.justificacion, pp.observacion, pp.resultado, pr.nombre AS nombre
      FROM prescripcion_prestacion pp
      JOIN prestacion pr ON pp.id_prestacion = pr.id_prestacion
      WHERE pp.id_prescripcion = ?
    `;

    const connection = await pool.getConnection();

    try {
      const [prescripcionRows] = await connection.query(queryPrescripcion, [id_prescripcion]);
      if (prescripcionRows.length === 0) return null;

      const prescripcion = prescripcionRows[0];

      const [medicamentos] = await connection.query(queryMedicamentos, [id_prescripcion]);
      const [prestaciones] = await connection.query(queryPrestaciones, [id_prescripcion]);

      prescripcion.medicamentos = medicamentos;
      prescripcion.prestaciones = prestaciones;

      return prescripcion;
    } finally {
      connection.release();
    }
  }

  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM prescripcion');
    return rows;
  }

  //prescripciones por paciente
  static async getAllByPaciente(id_paciente) {
    const [rows] = await pool.query('SELECT * FROM prescripcion WHERE id_paciente = ? ORDER BY fecha_prescripcion DESC', [id_paciente]);
    return rows;
  }
}

module.exports = Prescripcion;
