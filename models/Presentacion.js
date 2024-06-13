const pool = require('../config/config');

class Presentacion {
    constructor (id_presentacion, id_medicamento, id_concentracion, id_forma_farmaceutica, nombre_comercial, cantidad_unidades ){
        this.id_presentacion = id_presentacion;
        this.id_medicamento = id_medicamento;
        this.id_concentracion = id_concentracion;
        this.id_forma_farmaceutica = id_forma_farmaceutica;
        this.nombre_comercial = nombre_comercial;
        this.cantidad_unidades = cantidad_unidades;
    }

    static getAll(callback) {
        pool.query('SELECT * FROM presentacion', (error, results) => {
            if(error) {
                return callback(error, null);
            }
            const presentaciones = results.map(row => new Presentacion(row.id_presentacion, row.id_medicamento, row.id_concentracion, row.id_forma_farmaceutica, row.nombre_comercial, row.cantidad_unidades));
            callback(null, results);
        })
    }
    static getById(id, callback) {
        pool.query('SELECT * FROM presentacion WHERE id_presentacion = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                callback(null, new Presentacion(results[0].id_presentacion, results[0].id_medicamento, results[0].id_concentracion, results[0].id_forma_farmaceutica, results[0].nombre_comercial, results[0].cantidad_unidades));
            } else {
                callback({ message: 'Presentación no encontrada' }, null);
            }
        });
    }
    static getAllPresentaciones(callback) {
        const query = `
            SELECT 
                pr.id_presentacion,
                pr.nombre_comercial,
                pr.cantidad_unidades,
                me.nombre_generico,
                co.valor AS concentracion,
                ff.nombre AS forma_farmaceutica
            FROM presentacion pr
            JOIN medicamento me ON pr.id_medicamento = me.id_medicamento
            JOIN concentracion co ON pr.id_concentracion = co.id_concentracion
            JOIN forma_farmaceutica ff ON pr.id_forma_farmaceutica = ff.id_forma_farmaceutica
            WHERE me.estado = 'activo';
        `;
    
        pool.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
    

    static getByMedicamentoId(id_medicamento, callback) {
        pool.query('SELECT * FROM presentacion WHERE id_medicamento = ?', [id_medicamento], (error, results) => {
            if(error) {
                return callback(error, null);
            }
            const presentaciones = results.map(row => new Presentacion(row.id_presentacion, row.id_medicamento, row.id_concentracion, row.id_forma_farmaceutica, row.nombre_comercial, row.cantidad_unidades));
            callback(null, results);
        })
    }
}

module.exports = Presentacion