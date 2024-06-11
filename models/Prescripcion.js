const pool = require('../config/config');

class Prescripcion {
    constructor(id_prescripcion, id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia) {
        this.id_prescripcion = id_prescripcion;
        this.id_profesional_salud = id_profesional_salud;
        this.id_paciente = id_paciente;
        this.diagnostico = diagnostico;
        this.fecha_prescripcion = fecha_prescripcion;
        this.vigencia = vigencia;
    }

    static create(data, callback) {
        const { id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia, medicamentos, prestaciones } = data;
        pool.getConnection((err, connection) => {
            if(err){ 
                return callback(err);
            }

            connection.beginTransaction((err) => {
                if(err){
                    connection.release();
                    return callback(err);
                }

                const query = 'INSERT INTO prescripcion (id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia) VALUES(?,?,?,?,?)';
                connection.query(query, [id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia], (error, results) => {
                    if(error){
                        return connection.rollback(() => {
                            connection.release();
                            callback(error);
                        });
                    }
                    const id_prescripcion = results.insertId;

                    const medicamentosQueries = medicamentos.map((medicamento) => {
                        const { id_presentacion, dosis, duracion, intervalo_administracion } = medicamento;
                        return new Promise((resolve, reject) => {
                            const query = 'INSERT INTO prescripcion_medicamento (id_prescripcion, id_presentacion, dosis, duracion, intervalo_administracion) VALUES(?,?,?,?,?)';
                            connection.query(query, [id_prescripcion, id_presentacion, dosis, duracion, intervalo_administracion], (error, results) => {    
                                if(error){
                                    reject(error);
                                }else{
                                    resolve();
                                }
                            });
                        });
                    });

                    const prestacionQueries = prestaciones.map((prestacion) => {
                        const { id_prestacion, observacion, resultado } = prestacion;
                        return new Promise((resolve, reject) => {
                            const query = 'INSERT INTO prescripcion_prestacion (id_prescripcion, id_prestacion, observacion, resultado) VALUES(?,?,?,?)';
                            connection.query(query, [id_prescripcion, id_prestacion, observacion, resultado], (error) => {    
                                if(error){
                                    reject(error);
                                }else{
                                    resolve();
                                }
                            });
                        });
                    });

                    Promise.all([...medicamentosQueries, ...prestacionQueries])
                        .then(() => {
                            connection.commit((error) => {
                                if(error){
                                    return connection.rollback(() => {
                                        connection.release();
                                        callback(error);
                                    });
                                }
                                connection.release();
                                callback(null, results);
                            });
                        })
                        .catch((error) => {
                            connection.rollback(() => {
                                connection.release();
                                callback(error);
                            });
                        });
                });
            });
        });
    }

    static getAll(callback) {
        pool.query('SELECT * FROM prescripcion', (error, results) => {
            if (error) {
                callback(error, null);
            } else {
                const prescripciones = results.map(row => ({
                    id_prescripcion: row.id_prescripcion,
                    id_profesional_salud: row.id_profesional_salud,
                    id_paciente: row.id_paciente,
                    diagnostico: row.diagnostico,
                    fecha_prescripcion: row.fecha_prescripcion,
                    vigencia: row.vigencia
                }));
                callback(null, prescripciones);
            }
        });
    }
    

    static getById(id_prescripcion, callback) {
        pool.query('SELECT * FROM prescripcion WHERE id_prescripcion = ?', [id], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            if (results.length) {
                callback(null, new Prescripcion(results[0].id_prescripcion, results[0].id_profesional_salud, results[0].id_paciente, results[0].diagnostico, results[0].fecha_prescripcion, results[0].vigencia));
            } else {
                callback({ message: 'Prescripción no encontrada' }, null);
            }
        });
    }
}

module.exports = Prescripcion;
