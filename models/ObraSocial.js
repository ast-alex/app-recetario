const pool = require('../config/config');

class ObraSocial {
    constructor(id_obra_social, nombre) {    
        this.id_obra_social = id_obra_social;
        this.nombre = nombre;
    }

    static async getAll() {
        const [results] = await pool.query('SELECT * FROM obrasocial');
        return results.map(row => new ObraSocial(row.id_obra_social, row.nombre));
    }

    static async getById(id) {
        const [results] = await pool.query('SELECT * FROM obrasocial WHERE id_obra_social = ?', [id]);
        if (results.length) {
            const row = results[0];
            return new ObraSocial(row.id_obra_social, row.nombre);
        }
        throw new Error('Obra social no encontrada');
    }
}

module.exports = ObraSocial;
