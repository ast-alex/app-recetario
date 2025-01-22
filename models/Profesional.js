const pool = require('../config/config');

class ProfesionalSalud {
    constructor(id_profesional_salud, id_usuario, id_rol, nombre, apellido, dni, profesion, especialidad, domicilio, matricula, id_refeeps, fecha_caducidad, fecha_registro, vigente) {
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
        this.vigente = vigente;
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
    
}

module.exports = ProfesionalSalud