const pool = require('../config/config');

class ProfesionalSalud {
  constructor({
    id_profesional_salud,
    id_usuario,
    id_rol,
    nombre,
    apellido,
    dni,
    profesion,
    especialidad,
    domicilio,
    matricula,
    id_refeeps,
    fecha_caducidad,
    fecha_registro,
    estado
  }) {
    this.id_profesional_salud = id_profesional_salud;
    this.id_usuario = id_usuario;
    this.id_rol = id_rol;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.profesion = profesion;
    this.especialidad = especialidad;
    this.domicilio = domicilio;
    this.matricula = matricula;
    this.id_refeeps = id_refeeps;
    this.fecha_caducidad = fecha_caducidad;
    this.fecha_registro = fecha_registro;
    this.estado = estado
  }

  static async getAll({incluirInactivos = false} = {}) {
    let query = 'SELECT * FROM profesional_salud';
    if(!incluirInactivos) query += ' WHERE estado = "activo"'
    const [results] = await pool.query(query);
    return results;
  }

  static async getById(id) {
    const [results] = await pool.query('SELECT * FROM profesional_salud WHERE id_profesional_salud = ?', [id]);
    if (results.length === 0) throw new Error('Profesional de salud no encontrado');
    
    const row = results[0];
    return new ProfesionalSalud(row)
  }

  static async create(profesional) {
    const query = `
      INSERT INTO profesional_salud (id_usuario, id_rol, nombre, apellido, dni, profesion, especialidad, domicilio, matricula, id_refeeps, fecha_caducidad, fecha_registro, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      profesional.id_usuario,
      profesional.id_rol,
      profesional.nombre,
      profesional.apellido,
      profesional.dni,
      profesional.profesion,
      profesional.especialidad,
      profesional.domicilio,
      profesional.matricula,
      profesional.id_refeeps,
      profesional.fecha_caducidad,
      profesional.fecha_registro,
      profesional.estado || 'activo'
    ]);
    return { id_profesional_salud: result.insertId, ...profesional };
  }

  static async getByUserId(id_usuario) {
    const [results] = await pool.query('SELECT * FROM profesional_salud WHERE id_usuario = ?', [id_usuario]);
    return results[0] || null;
  }

  static async updateEstado(id_profesional_salud, id_usuario, estado) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      await conn.query('UPDATE profesional_salud SET estado = ? WHERE id_profesional_salud = ?', [estado, id_profesional_salud]);
      await conn.query('UPDATE usuario SET estado = ? WHERE id_usuario = ?', [estado, id_usuario]);
      await conn.commit();
      
      return{ success: true };
    } catch (error) {
      await conn.rollback();
      throw error;
    }finally {
      conn.release();
    }
  }

  static async updateCampos(id, datos){
    const campos = [];
    const valores = [];

    for(let key in datos){
      if(datos[key]){
        campos.push(`${key} = ?`);
        valores.push(datos[key]);
      }
    }

    if(campos.length === 0) return;

    valores.push(id);

    const query = `UPDATE profesional_salud SET ${campos.join(', ')} WHERE id_profesional_salud = ?`;
    await pool.query(query, valores);
  }
  
}

module.exports = ProfesionalSalud;
