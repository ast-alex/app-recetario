const pool = require('../config/config');

class MedicamentoConcentracion {
    constructor(id, id_medicamento, id_concentracion) {
        this.id = id;
        this.id_medicamento = id_medicamento;
        this.id_concentracion = id_concentracion;
    }

    static getByMedicamento(id_medicamento, callback) {
        const query = `
            SELECT c.id_concentracion, c.valor
            FROM medicamento_concentracion mc
            JOIN concentracion c ON mc.id_concentracion = c.id_concentracion
            WHERE mc.id_medicamento = ?`;

        pool.query(query, [id_medicamento], (error, results) => {
            if (error) return callback(error, null);
            callback(null, results);
        });
    }

    static add(id_medicamento, id_concentracion, callback) {
        pool.query(
            'INSERT INTO medicamento_concentracion (id_medicamento, id_concentracion) VALUES (?, ?)',
            [id_medicamento, id_concentracion],
            (error, results) => {
                if (error) return callback(error, null);
                callback(null, { insertId: results.insertId });
            }
        );
    }

    static remove(id_medicamento, id_concentracion, callback) {
        pool.query(
            'DELETE FROM medicamento_concentracion WHERE id_medicamento = ? AND id_concentracion = ?',
            [id_medicamento, id_concentracion],
            (error, results) => {
                if (error) return callback(error, null);
                callback(null, results);
            }
        );
    }

    static removeAllByMedicamento(id_medicamento, callback) {
        pool.query(
            'DELETE FROM medicamento_concentracion WHERE id_medicamento = ?',
            [id_medicamento],
            (error, results) => {
                if (error) return callback(error, null);
                callback(null, results);
            }
        );
    }
}

module.exports = MedicamentoConcentracion;
