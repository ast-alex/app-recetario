const pool = require('../config/config');

class Familia {
    constructor(id_familia, nombre) {
        this.id_familia = id_familia;
        this.nombre = nombre;
    }

    static async getAll() {
        const [results] = await pool.query('SELECT * FROM familia');
        const familias = [];

        for (const row of results) {
            familias.push(new Familia(row.id_familia, row.nombre));
        }

        return familias;        
    }

    static async getById(id) {
        const [results] = await pool.query('SELECT * FROM familia WHERE id_familia = ?', [id]);

        if (results.length === 0) {
            throw new Error('Familia no encontrada');
        }

        return results[0];
    }
}

module.exports = Familia;