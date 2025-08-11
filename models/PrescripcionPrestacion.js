const pool = require('../config/config');

class PrescripcionPrestacion{
    constructor(id_prescripcion_prestacion, id_prescripcion, id_prestacion, observacion, resultado, indicacion, justificacion, lado){
        this.id_prescripcion_prestacion = id_prescripcion_prestacion;
        this.id_prescripcion = id_prescripcion;
        this.id_prestacion = id_prestacion;
        this.observacion = observacion;
        this.resultado = resultado;
        this.indicacion = indicacion;
        this.justificacion = justificacion;
        this.lado = lado;
    }

    static async findById(id_prescripcion_prestacion) {
        const [rows] = await pool.query(
            'SELECT * FROM prescripcion_prestacion WHERE id_prescripcion_prestacion = ?', 
            [id_prescripcion_prestacion]
        );
        return rows[0];
    }

    static async findByPrescripcion(id_prescripcion) {
        const [rows] = await pool.query(
            'SELECT * FROM prescripcion_prestacion WHERE id_prescripcion = ?', 
            [id_prescripcion]
        );
        return rows;
    }

    static async updateObservacionYResultado(id_prescripcion_prestacion, observacion, resultado) {
        const [rows] = await pool.query(
            'UPDATE prescripcion_prestacion SET observacion = ?, resultado = ? WHERE id_prescripcion_prestacion = ?', 
            [observacion, resultado, id_prescripcion_prestacion]
        );
        return rows.affectedRows > 0;
    }

    static async findWithNombreByPrescripcion(id_prescripcion){
        const [rows] = await pool.query(`
            SELECT pp.*, pr.nombre
            FROM prescripcion_prestacion pp
            JOIN prestacion pr ON pp.id_prestacion = pr.id_prestacion
            WHERE pp.id_prescripcion = ?
        `, [id_prescripcion]);
        return rows;
    }
}

module.exports = PrescripcionPrestacion