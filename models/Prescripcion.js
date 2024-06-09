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

    static getAll(callback) {
        pool.query('SELECT * FROM prescripcion', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM prescripcion WHERE id_prescripcion = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                callback(null, new Prescripcion(...results[0]));
            } else {
                callback({ message: 'Prescripcion no encontrada' }, null);
            }
        });
    }
}


