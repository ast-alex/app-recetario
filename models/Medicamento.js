const pool = require('../config/config');

class Medicamento {
    constructor(id_medicamento, nombre_generico, estado, id_categoria, id_familia){
        this.id_medicamento = id_medicamento;
        this.nombre_generico = nombre_generico;
        this.estado = estado;
        this.id_categoria = id_categoria;
        this.id_familia = id_familia;
    }

    static getAll(callback) {
        pool.query('SELECT * FROM medicamento;', (err, results) => {
            if (err) {
                return callback(err, null);
            }
            const medicamentos = results.map(row => new Medicamento(row.id_medicamento, row.nombre_generico, row.estado, row.id_categoria, row.id_familia));
            callback(null, results);
        });
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM medicamento WHERE id_medicamento = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                callback(null, new Medicamento(...results[0]));
            } else {
                callback({ message: 'Medicamento no encontrado' }, null);
            }
        });
    }
}

module.exports = Medicamento