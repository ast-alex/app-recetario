const pool = require('../config/config');
class Prestacion {
  constructor(id_prestacion, nombre) {
    this.id_prestacion = id_prestacion;
    this.nombre = nombre;
  }

  static async getAll() {
    const [results] = await pool.query('SELECT * FROM prestacion');
    return results.map(row => new Prestacion(row.id_prestacion, row.nombre));
  }

  static async getById(id) {
    const [results] = await pool.query('SELECT * FROM prestacion WHERE id_prestacion = ?', [id]);
    if (results.length === 0) {
      throw new Error('Prestación no encontrada');
    }
    const row = results[0];
    return new Prestacion(row.id_prestacion, row.nombre);
  }
}

module.exports = Prestacion;