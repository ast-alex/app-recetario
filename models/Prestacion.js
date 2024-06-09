const pool = require('../config');

class Prestacion {
    constructor(id_prestacion, nombre, lado, indicacion, justificacion) {
        this.id_prestacion = id_prestacion;
        this.nombre = nombre;
        this.lado = lado;
        this.indicacion = indicacion;
        this.justificacion = justificacion;
    }

    static getAll(callback) {
        pool.query('SELECT * FROM prestacion', (error, results) => {
            if (error) {
                throw error;
            }
            callback(null, results);
        });
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM prestacion WHERE id_prestacion = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                callback(null, new Prestacion(...results[0]));
            } else {
                callback({ message: 'Prestacion no encontrada' }, null);
            }
        });
    }
}
