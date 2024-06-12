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
            if (err) {
                return callback(err);
            }
    
            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callback(err);
                }
    
                const query = 'INSERT INTO prescripcion (id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia) VALUES (?, ?, ?, ?, ?)';
                connection.query(query, [id_profesional_salud, id_paciente, diagnostico, fecha_prescripcion, vigencia], (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            connection.release();
                            callback(error);
                        });
                    }
                    const id_prescripcion = results.insertId;
    
                    const medicamentosQueries = (medicamentos || []).map((medicamento) => {
                        const { id_presentacion, duracion, intervalo_administracion } = medicamento;
                        return new Promise((resolve, reject) => {
                            const query = 'INSERT INTO prescripcion_medicamento (id_prescripcion, id_presentacion, duracion, intervalo_administracion) VALUES (?, ?, ?, ?)';
                            connection.query(query, [id_prescripcion, id_presentacion, duracion, intervalo_administracion], (error, results) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });
    
                    const prestacionQueries = (prestaciones || []).map((prestacion) => {
                        const { id_prestacion, observacion, resultado } = prestacion;
                        return new Promise((resolve, reject) => {
                            const query = 'INSERT INTO prescripcion_prestacion (id_prescripcion, id_prestacion, observacion, resultado) VALUES (?, ?, ?, ?)';
                            connection.query(query, [id_prescripcion, id_prestacion, observacion, resultado], (error, results) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });
    
                    Promise.all([...medicamentosQueries, ...prestacionQueries])
                        .then(() => {
                            connection.commit((error) => {
                                if (error) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        callback(error);
                                    });
                                }
    
                                Prescripcion.getDetailsById(id_prescripcion, (error, prescripcion) => {
                                    if (error) {
                                        connection.release();
                                        callback(error);
                                    } else {
                                        connection.release();
                                        callback(null, prescripcion);
                                    }
                                });
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

        static getDetailsById(id_prescripcion, callback) {
            const queryPrescripcion = `
                SELECT p.id_prescripcion, p.fecha_prescripcion, p.diagnostico, p.vigencia,
                    ps.nombre AS nombre_profesional, ps.apellido AS apellido_profesional, ps.dni AS documento_profesional,
                    ps.profesion, ps.especialidad, ps.domicilio AS domicilio_profesional, ps.matricula,
                    pa.nombre AS nombre_paciente, pa.apellido AS apellido_paciente, pa.dni AS documento_paciente,
                    pa.fecha_nacimiento, pa.sexo, os.nombre AS obra_social, pl.nombre AS plan
                FROM prescripcion p
                JOIN profesional_salud ps ON p.id_profesional_salud = ps.id_profesional_salud
                JOIN paciente pa ON p.id_paciente = pa.id_paciente
                JOIN plan pl ON pa.id_plan = pl.id_plan
                JOIN obrasocial os ON pl.id_obra_social = os.id_obra_social
                WHERE p.id_prescripcion = ?`;
    
            const queryMedicamentos = `
            SELECT pm.id_prescripcion_medicamento, pm.duracion, pm.intervalo_administracion, pr.nombre_comercial,
                pr.cantidad_unidades, me.nombre_generico, co.valor AS concentracion, ff.nombre AS forma_farmaceutica
            FROM prescripcion_medicamento pm
            JOIN presentacion pr ON pm.id_presentacion = pr.id_presentacion
            JOIN medicamento me ON pr.id_medicamento = me.id_medicamento
            JOIN concentracion co ON pr.id_concentracion = co.id_concentracion
            JOIN forma_farmaceutica ff ON pr.id_forma_farmaceutica = ff.id_forma_farmaceutica
            WHERE pm.id_prescripcion = ?`;

            const queryPrestaciones = `
            SELECT pp.id_prescripcion_prestacion, pp.observacion, pp.resultado, pr.nombre AS nombre_prestacion
            FROM prescripcion_prestacion pp
            JOIN prestacion pr ON pp.id_prestacion = pr.id_prestacion
            WHERE pp.id_prescripcion = ?`;

            pool.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }

            connection.query(queryPrescripcion, [id_prescripcion], (error, resultsPrescripcion) => {
                if (error) {
                    connection.release();
                    return callback(error);
                }

                if (resultsPrescripcion.length === 0) {
                    connection.release();
                    return callback(null, null);
                }

                const prescripcion = resultsPrescripcion[0];
                prescripcion.medicamentos = [];
                prescripcion.prestaciones = [];

                connection.query(queryMedicamentos, [id_prescripcion], (error, resultsMedicamentos) => {
                    if (error) {
                        connection.release();
                        return callback(error);
                    }
                    prescripcion.medicamentos = resultsMedicamentos;

                    connection.query(queryPrestaciones, [id_prescripcion], (error, resultsPrestaciones) => {
                        connection.release();
                        if (error) {
                            return callback(error);
                        }
                        prescripcion.prestaciones = resultsPrestaciones;
                        callback(null, prescripcion);
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
                
                // Obtener los detalles (medicamentos y prestaciones) para cada prescripción
                const prescripcionDetalles = [];
                let count = 0;
                
                if (prescripciones.length === 0) {
                    callback(null, prescripcionDetalles);
                }
                
                prescripciones.forEach(prescripcion => {
                    Prescripcion.getMedicamentos(prescripcion.id_prescripcion, (error, medicamentos) => {
                        if (error) {
                            callback(error, null);
                            return;
                        }
                        
                        prescripcion.medicamentos = medicamentos;
                        
                        Prescripcion.getPrestaciones(prescripcion.id_prescripcion, (error, prestaciones) => {
                            if (error) {
                                callback(error, null);
                                return;
                            }
                            
                            prescripcion.prestaciones = prestaciones;
                            prescripcionDetalles.push(prescripcion);
                            
                            // Verificar si todas las prescripciones ya tienen sus detalles
                            count++;
                            if (count === prescripciones.length) {
                                callback(null, prescripcionDetalles);
                            }
                        });
                    });
                });
            }
        });
    }

    static getMedicamentos(id_prescripcion, callback) {
        pool.query('SELECT * FROM prescripcion_medicamento WHERE id_prescripcion = ?', [id_prescripcion], (error, results) => {
            if (error) {
                callback(error, null);
            }else{
                callback(null, results);
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
    
    
    static getPrestaciones(id_prescripcion, callback) {
        pool.query('SELECT * FROM prescripcion_prestacion WHERE id_prescripcion = ?', [id_prescripcion], (error, results) => {
            if (error) {
                callback(error, null);
            }else{
                callback(null, results);
            }
        });
    }
}

module.exports = Prescripcion;
