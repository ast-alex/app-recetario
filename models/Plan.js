const pool = require('../config/config');

class Plan {
    constructor(id_plan, id_obra_social, nombre, cobertura) {
        this.id_plan = id_plan;
        this.id_obra_social = id_obra_social;
        this.nombre = nombre;
        this.cobertura = cobertura;
    }

    static async getAll() {
        const [results] = await pool.query('SELECT * FROM plan');
        return results.map(row => new Plan(row.id_plan, row.id_obra_social, row.nombre, row.cobertura));
    }

    static async getById(id) {
        const [results] = await pool.query('SELECT * FROM plan WHERE id_plan = ?', [id]);
        if (results.length) {
            const row = results[0];
            return new Plan(row.id_plan, row.id_obra_social, row.nombre, row.cobertura);
        }
        throw new Error('Plan no encontrado');
    }
}

module.exports = Plan;
