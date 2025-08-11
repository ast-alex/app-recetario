const pool = require('../config/config');

class FormaFarmaceutica {
    constructor(id_forma_farmaceutica, id_medicamento, nombre) {
        this.id_forma_farmaceutica = id_forma_farmaceutica;
        this.id_medicamento = id_medicamento;
        this.nombre = nombre;
    }

    static async getAll() {
        try{
            const [results] = await pool.query('SELECT * FROM forma_farmaceutica');
            const formas_farmaceuticas = results.map(row => new FormaFarmaceutica(row.id_forma_farmaceutica, row.id_medicamento, row.nombre));
            return formas_farmaceuticas;
        } catch (error) {
            throw error;
        }
    }

    static async getByMedicamento(id_medicamento) {
        try{
            const [results] = await pool.query(
                'SELECT * FROM forma_farmaceutica WHERE id_medicamento = ?', 
                [id_medicamento]
            );
            const formas_farmaceuticas = results.map(row => new FormaFarmaceutica(row.id_forma_farmaceutica, row.id_medicamento, row.nombre));
            return formas_farmaceuticas;
        } catch (error) {
            throw error;
        }
    }

    static async add(id_medicamento, nombre) {
        const [results] = await pool.query(
            'INSERT INTO forma_farmaceutica (id_medicamento, nombre) VALUES (?, ?)', 
            [id_medicamento, nombre]
        );
        return { id_forma_farmaceutica: results.insertId };
    }

    //metodo update
    static async update(id, forma_farmaceutica) {
        const [results] = await pool.query(
            'UPDATE forma_farmaceutica SET id_medicamento = ?, nombre = ? WHERE id_forma_farmaceutica = ?', 
            [forma_farmaceutica.id_medicamento, forma_farmaceutica.nombre, id]
        );
        return results;
    }

    static async delete(id_forma_farmaceutica) {
        const [results] = await pool.query(
            'DELETE FROM forma_farmaceutica WHERE id_forma_farmaceutica = ?', 
            [id_forma_farmaceutica]
        );
        return results;
    }
}

module.exports = FormaFarmaceutica;