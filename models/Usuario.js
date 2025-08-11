const pool = require('../config/config');

class Usuario {
    
    // Obtener todos los usuarios ADMIN
    static async getAllAdmin() {
        const [results] = await pool.query('SELECT * FROM usuario WHERE id_rol = 2');
        return results;
    }

    // Obtener todos los usuarios
    static async getAll() {
        const [results] = await pool.query('SELECT * FROM usuario');
        return results;
    }

    static async create(usuario) {
        const query = `
          INSERT INTO usuario (email, password, id_rol, estado)
          VALUES (?, ?, ?, ?)`;
        const [results] = await pool.query(query, [usuario.email, usuario.password, usuario.id_rol, 'activo']);
        return { id_usuario: results.insertId, ...usuario };
    }

    static async getById(id) {
        const [results] = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
        if (results.length) {
            const { id_usuario, email, password, id_rol } = results[0];
            return { id_usuario, email, password, id_rol };
        }
        throw new Error('Usuario no encontrado');
    }

    static async getByEmail(email) {
        const [results] = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
        return results[0];
    }

    static async updatePassword(id, hashedPassword){
        const query = 'UPDATE usuario SET password = ? WHERE id_usuario = ?';
        const [results] = await pool.query(query, [hashedPassword, id]);
        return results;
    }
}

module.exports = Usuario;
