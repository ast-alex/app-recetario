const pool = require('../config/config');

class Categoria {
    constructor(id_categoria, nombre) {
        this.id_categoria = id_categoria;
        this.nombre = nombre;
    }

    static async getAll() {
        const [results] = await pool.query('SELECT * FROM categoria');
        const categorias = [];

        for (const row of results) {
            categorias.push(new Categoria(row.id_categoria, row.nombre));
        }

        return categorias;
    }

    static async getById(id) {
        const [results] = await pool.query('SELECT * FROM categoria WHERE id_categoria = ?', [id]);

        if (results.length === 0) {
            throw new Error('Categoria no encontrada');
        }

        return results[0];
    }
}

module.exports = Categoria;