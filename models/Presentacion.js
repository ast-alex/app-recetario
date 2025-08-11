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

    static async getAll() {
        try{
            const [results] = await pool.query('SELECT * FROM presentacion');
            return results.map(row => 
                new Presentacion(
                    row.id_presentacion, 
                    row.id_medicamento, 
                    row.id_concentracion, 
                    row.id_forma_farmaceutica, 
                    row.nombre_comercial, 
                    row.cantidad_unidades
                )
            );
        }catch (error) {
            throw error;
        }
    }
    static async getById(id) {
        try {
            const [results] = await pool.query(`
                SELECT 
                    p.*, 
                    m.nombre_generico, 
                    c.valor AS concentracion, 
                    f.nombre AS forma_farmaceutica
                FROM presentacion p
                LEFT JOIN medicamento m ON p.id_medicamento = m.id_medicamento
                LEFT JOIN concentracion c ON p.id_concentracion = c.id_concentracion
                LEFT JOIN forma_farmaceutica f ON p.id_forma_farmaceutica = f.id_forma_farmaceutica
                WHERE p.id_presentacion = ?
            `, [id]);

            if (results.length === 0) {
                throw new Error('Presentación no encontrada');
            }

            const row = results[0];

            return {
                id_presentacion: row.id_presentacion,
                id_medicamento: row.id_medicamento,
                id_concentracion: row.id_concentracion,
                id_forma_farmaceutica: row.id_forma_farmaceutica,
                nombre_comercial: row.nombre_comercial,
                cantidad_unidades: row.cantidad_unidades,
                nombre_generico: row.nombre_generico,
                concentracion: row.concentracion,
                forma_farmaceutica: row.forma_farmaceutica
            };

        } catch (error) {
            throw error;
        }
    }


    static async getAllPresentaciones() {
        try{
            const [results] = await pool.query(`
                SELECT 
                    pr.id_presentacion,
                    pr.id_medicamento,
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
            `);
            return results;
        }catch (error) {
            throw error;
        }
    }
    
    static async getByMedicamento(id_medicamento) {
        try{
            const [results] = await pool.query('SELECT * FROM presentacion WHERE id_medicamento = ?', [id_medicamento]);
            return results.map(row => 
                new Presentacion(
                    row.id_presentacion, 
                    row.id_medicamento, 
                    row.id_concentracion, 
                    row.id_forma_farmaceutica, 
                    row.nombre_comercial, 
                    row.cantidad_unidades
                )
            );
        }catch (error) {
            throw error;    
        }
    }
}

module.exports = Presentacion