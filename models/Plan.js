const pool = require('../config/config');

class Plan {
    constructor(id_plan, id_obra_social, nombre, cobertura) {
        this.id_plan = id_plan;
        this.id_obra_social = id_obra_social;
        this.nombre = nombre;
        this.cobertura = cobertura;
    }

    static getAll(callback) {
        pool.query('SELECT * FROM plan', (error, results) => {
            if (error) {
                return callback(error, null);
            }
            const planes = results.map(row => new Plan(row.id_plan, row.id_obra_social, row.nombre, row.cobertura));
            callback(null, planes);
        });
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM plan WHERE id_plan = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                callback(null, new Plan(results[0].id_plan, results[0].id_obra_social, results[0].nombre, results[0].cobertura));
            } else {
                callback({ message: 'Plan no encontrado' }, null);
            }
        });
    }
}

module.exports = Plan;
