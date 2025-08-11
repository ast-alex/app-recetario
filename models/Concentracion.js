const pool = require('../config/config');

class Concentracion {
    constructor(id_concentracion, valor) {
        this.id_concentracion = id_concentracion;
        this.valor = valor;
    }

    static async getAll() {
        try {
            const [results] = await pool.query('SELECT * FROM concentracion');
            return results.map(row => new Concentracion(row.id_concentracion, row.valor));
        } catch (error) {
            throw error;
        }
    }

    static async create(valor) {
        const [results] = await pool.query(
            'INSERT INTO concentracion (valor) VALUES (?)', 
            [valor]
        );
        return{ id_concentracion: results.insertId };
    }

    static async update(id, valor) {
       const [results] = await pool.query(
            'UPDATE concentracion SET valor = ? WHERE id_concentracion = ?', 
            [valor, id]
        );
        return results;
    }

    static async delete(id) {
        const [results] = await pool.query(
            'DELETE FROM concentracion WHERE id_concentracion = ?', 
            [id]
        );
        return results;
    }

    static async getByMedicamento(id_medicamento) {
        const sql = `
            SELECT c.id_concentracion, c.valor
            FROM medicamento_concentracion mc
            JOIN concentracion c ON mc.id_concentracion = c.id_concentracion
            WHERE mc.id_medicamento = ?
        `;

        const [results] = await pool.query(sql, [id_medicamento]);
        return results.map(row => new Concentracion(row.id_concentracion, row.valor));
    }
}

module.exports = Concentracion;
