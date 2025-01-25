const pool = require('../config/config');

class Usuario {
    static create(usuario) {
        return new Promise((resolve, reject) => {
            const query = `
            INSERT INTO usuario (email, password, id_rol)
            VALUES (?, ?, ?)`;

            pool.query(query, [usuario.email, usuario.password, usuario.id_rol], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_usuario: results.insertId, ...usuario });
                }
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
            pool.query(query, [id], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length) {
                    const { id_usuario, email, password, id_rol } = results[0];
                    const usuario = { id_usuario, email, password, id_rol };
                    resolve(usuario);
                } else {
                    reject({ message: 'Usuario no encontrado' });
                }
            });
        });
    }

    static getByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuario WHERE email = ?';
            pool.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]); // Retorna el primer usuario encontrado
                }
            });
        });
    }
}

module.exports = Usuario;
