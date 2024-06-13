const pool = require('../config/config');

class ObraSocial {
    constructor(id_obra_social, nombre) {    
        this.id_obra_social = id_obra_social;
        this.nombre = nombre;
    }

    static getAll(callback) {
        pool.query('SELECT * FROM obrasocial', (error, results) => {
            if (error) {
                return callback(error, null);
            }
            const obrasSociales = results.map(row => new ObraSocial(row.id_obra_social, row.nombre));
            callback(null, obrasSociales);
        });
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM obrasocial WHERE id_obra_social = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                callback(null, new ObraSocial(results[0].id_obra_social, results[0].nombre));
            } else {
                callback({ message: 'Obra social no encontrada' }, null);
            }
        });
    }
}

module.exports = ObraSocial;
