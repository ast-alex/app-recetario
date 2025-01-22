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
}

module.exports = Usuario;
