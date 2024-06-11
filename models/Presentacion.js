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