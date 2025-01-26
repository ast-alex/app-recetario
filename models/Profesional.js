const pool = require('../config/config');

class ProfesionalSalud {
    constructor(id_profesional_salud, id_usuario, id_rol, nombre, apellido, dni, profesion, especialidad, domicilio, matricula, id_refeeps, fecha_caducidad, fecha_registro) {
        this.id_profesional_salud = id_profesional_salud;
        this.id_usuario = id_usuario;
        this.id_rol = id_rol;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.profesion = profesion;
        this.especialidad = especialidad;
        this.domicilio = domicilio;
        this.matricula = matricula;
        this.id_refeeps = id_refeeps;
        this.fecha_caducidad = fecha_caducidad;
        this.fecha_registro = fecha_registro;
    }
    static getAll(callback) {
        pool.query('SELECT * FROM profesional_salud', (error, results) => {
            if(error) {
                throw error;
            }
            callback(null, results);
        })
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM profesional_salud WHERE id_profesional_salud = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                const { id_profesional_salud, id_usuario, id_rol, nombre, apellido, dni, profesion, especialidad, domicilio, matricula, id_refeeps, fecha_caducidad, fecha_registro } = results[0];
                const profesional = new ProfesionalSalud(id_profesional_salud, id_usuario, id_rol, nombre, apellido, dni, profesion, especialidad, domicilio, matricula, id_refeeps, fecha_caducidad, fecha_registro);
                callback(null, profesional);
            } else {
                callback({ message: 'Profesional de salud no encontrado' }, null);
            }
        });
    }

    static create(profesional) {
        return new Promise((resolve, reject) => {
            const query = `
            INSERT INTO profesional_salud (id_usuario, id_rol, nombre, apellido, dni, profesion, especialidad, domicilio, matricula, id_refeeps, fecha_caducidad, fecha_registro)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            pool.query(
                query,
                [
                    profesional.id_usuario,
                    profesional.id_rol,
                    profesional.nombre,
                    profesional.apellido,
                    profesional.dni,
                    profesional.profesion,
                    profesional.especialidad,
                    profesional.domicilio,
                    profesional.matricula,
                    profesional.id_refeeps,
                    profesional.fecha_caducidad,
                    profesional.fecha_registro,
                ],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id_profesional_salud: results.insertId, ...profesional });
                    }
                }
            );
        });
    }

    static getByUserId(id_usuario, callback) {
        const query = 'SELECT * FROM profesional_salud WHERE id_usuario = ?';
        pool.query(query, [id_usuario], (err, results) => {
            if (err) {
                callback(err, null);
            }
            callback(null, results[0]);
        });
    }
    
}

module.exports = ProfesionalSalud