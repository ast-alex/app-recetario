const pool = require('../config/config');
const SweetAlert2 = require('sweetalert2');

class Paciente {
    constructor(id_paciente, id_plan, nombre, apellido, dni, fecha_nacimiento, sexo) {
        this.id_paciente = id_paciente;
        this.id_plan = id_plan;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fecha_nacimiento = fecha_nacimiento;
        this.sexo = sexo;
    }
    
    static getAll(callback) {
        pool.query('SELECT * FROM paciente', (error, results) => {
            if(error) {
                return callback(error, null);
            }
            const pacientes = results.map(row => new Paciente(row.id_paciente, row.id_plan, row.nombre, row.apellido, row.dni, row.fecha_nacimiento, row.sexo));
            callback(null, pacientes);
        });
    }

    static getById(id, callback) {
        pool.query('SELECT * FROM paciente WHERE id_paciente = ?', [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                callback(null, new Paciente(results[0].id_paciente, results[0].id_plan, results[0].nombre, results[0].apellido, results[0].dni, results[0].fecha_nacimiento, results[0].sexo));
            } else {
                callback({ message: 'Paciente no encontrado' }, null);
            }
        });
    }

    static create(data, callback){
        const { id_plan, nombre, apellido, dni, fecha_nacimiento, sexo } = data;
        pool.query('INSERT INTO paciente (id_plan, nombre, apellido, dni, fecha_nacimiento, sexo) VALUES(?,?,?,?,?,?)', 
            [id_plan, nombre, apellido, dni, fecha_nacimiento, sexo], 
            (error, results) => {
            if(error) {
                return callback(error);
            }
            SweetAlert2.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Paciente agregado correctamente',
                confirmButtonText: 'Ok'
            });
            callback(null, results);
            }
        );
    }

    static update(id, data, callback) {
        const { id_plan, nombre, apellido, dni, fecha_nacimiento, sexo } = data;
        pool.query('UPDATE paciente SET id_plan = ?, nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, sexo = ? WHERE id_paciente = ?', 
            [id_plan, nombre, apellido, dni, fecha_nacimiento, sexo, id], 
            (error, results) => {
            if(error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    static delete(id, callback) {
        pool.query('DELETE FROM paciente WHERE id_paciente = ?', [id], (error, results) => {
            if(error) {
                return callback(error);
            }
            callback(null, results);
        });
    }

    static getByDni (dni, callback) {
        pool.query('SELECT * FROM paciente WHERE dni = ?', [dni], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length) {
                const pacientes = results.map(row => new Paciente(row.id_paciente, row.id_plan, row.nombre, row.apellido, row.dni, row.fecha_nacimiento, row.sexo));
                callback(null, pacientes);
            } else {
                callback({ message: 'No se econtraron pacientes con ese DNI' }, null);
            }
        });
    }
}

module.exports = Paciente;