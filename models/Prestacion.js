const pool = require('../config/config');

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
            const prestaciones = results.map(row => new Prestacion(row.id_prestacion, row.nombre, row.lado, row.indicacion, row.justificacion));
            callback(null, results);
        });
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM prestacion WHERE id_prestacion = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                callback(null, new Prestacion(results[0].id_prestacion, results[0].nombre, results[0].lado, results[0].indicacion, results[0].justificacion, results[0].observacion, results[0].resultado));
            } else {
                callback({ message: 'Prestación no encontrada' }, null);
            }
        });
    }
}

module.exports = Prestacion;
