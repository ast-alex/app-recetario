const pool = require('../config/config');

class Paciente {
  constructor(id_paciente, id_plan, nombre, apellido, dni, fecha_nacimiento, sexo, activo) {
    this.id_paciente = id_paciente;
    this.id_plan = id_plan;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.fecha_nacimiento = fecha_nacimiento;
    this.sexo = sexo;
    this.activo = activo;
  }

  static async getAll() {
    const [results] = await pool.query('SELECT * FROM paciente');
    return results.map(row => new Paciente(row.id_paciente, row.id_plan, row.nombre, row.apellido, row.dni, row.fecha_nacimiento, row.sexo, row.activo));
  }

  static async getById(id) {
    const [results] = await pool.query('SELECT * FROM paciente WHERE id_paciente = ?', [id]);
    if (results.length === 0) {
      throw new Error('Paciente no encontrado');
    }
    const row = results[0];
    return new Paciente(row.id_paciente, row.id_plan, row.nombre, row.apellido, row.dni, row.fecha_nacimiento, row.sexo, row.activo);
  }

  static async create(data) {
    const { id_plan, nombre, apellido, dni, fecha_nacimiento, sexo } = data;
    const activo = true;
    const [result] = await pool.query(
      'INSERT INTO paciente (id_plan, nombre, apellido, dni, fecha_nacimiento, sexo, activo) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id_plan, nombre, apellido, dni, fecha_nacimiento, sexo, activo]
    );
    return { id_paciente: result.insertId, ...data, activo };
  }

  static async update(id, data) {
    const { id_plan, nombre, apellido, dni, fecha_nacimiento, sexo } = data;
    await pool.query(
      'UPDATE paciente SET id_plan = ?, nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, sexo = ? WHERE id_paciente = ?',
      [id_plan, nombre, apellido, dni, fecha_nacimiento, sexo, id]
    );
  }

  static async setActivo(id, estado) {
  const [result] = await pool.query('UPDATE paciente SET activo = ? WHERE id_paciente = ?', [estado, id]);
  return result.affectedRows > 0;
}


  static async getByDni(dni) {
    const [results] = await pool.query('SELECT * FROM paciente WHERE dni = ?', [dni]);
    if (results.length === 0) {
      throw new Error('No se encontraron pacientes con ese DNI');
    }
    return results.map(row => new Paciente(row.id_paciente, row.id_plan, row.nombre, row.apellido, row.dni, row.fecha_nacimiento, row.sexo, row.activo));
  }

  static async darBaja(id) {
    const [results] = await pool.query('UPDATE paciente SET activo = FALSE WHERE id_paciente = ?', [id]);
    return results.affectedRows > 0;
  }
}

module.exports = Paciente;
