const pool = require('../config/config');

class MedicamentoFormaFarmaceutica {
    constructor(id, id_medicamento, id_forma_farmaceutica) {
        this.id = id;
        this.id_medicamento = id_medicamento;
        this.id_forma_farmaceutica = id_forma_farmaceutica;
    }

    static getByMedicamento(id_medicamento, callback) {
        const query = `
            SELECT f.id_forma_farmaceutica, f.nombre
            FROM medicamento_forma_farmaceutica mf
            JOIN forma_farmaceutica f ON mf.id_forma_farmaceutica = f.id_forma_farmaceutica
            WHERE mf.id_medicamento = ?`;

        pool.query(query, [id_medicamento], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    }

    static add(id_medicamento, id_forma_farmaceutica, callback) {
        pool.query(
            'INSERT INTO medicamento_forma_farmaceutica (id_medicamento, id_forma_farmaceutica) VALUES (?, ?)',
            [id_medicamento, id_forma_farmaceutica],
            (error, results) => {
                if (error) return callback(error, null);
                callback(null, { insertId: results.insertId });
            }
        );
    }

    static remove(id_medicamento, id_forma_farmaceutica, callback) {
        pool.query(
            'DELETE FROM medicamento_forma_farmaceutica WHERE id_medicamento = ? AND id_forma_farmaceutica = ?',
            [id_medicamento, id_forma_farmaceutica],
            (error, results) => {
                if (error) return callback(error, null);
                callback(null, results);
            }
        );
    }

    static removeAllByMedicamento(id_medicamento, callback) {
        pool.query(
            'DELETE FROM medicamento_forma_farmaceutica WHERE id_medicamento = ?',
            [id_medicamento],
            (error, results) => {
                if (error) return callback(error, null);
                callback(null, results);
            }
        );
    }
}

module.exports = MedicamentoFormaFarmaceutica;