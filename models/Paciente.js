const pool = require('../config/config');

const buscarPaciente = async (term) => {
    try {
        const query = `
            SELECT * FROM paciente 
            WHERE nombre LIKE ? OR apellido LIKE ? OR dni LIKE ?
        `;
        const [rows] = await pool.execute(query, [`%${term}%`, `%${term}%`, `%${term}%`]);
        if (rows.length === 0) {
            throw new Error('No se encontraron resultados');
        }
        return rows;
    } catch (error) {
        console.error('Error en el modelo al buscar pacientes:', error.message);
        throw error;
    }
};


module.exports = {
    buscarPaciente,
    
    crearPaciente: async (paciente) =>{
        try {
            const {id_plan, nombre, apellido, dni, fecha_nacimiento, sexo} = paciente;
            const [result] = await pool.execute('INSERT INTO paciente (id_plan, nombre, apellido, dni, fecha_nacimiento, sexo) VALUES (?, ?, ?, ?, ?, ?)', 
                [id_plan, nombre, apellido, dni, fecha_nacimiento, sexo]
            );
            return result.insertId;
        } catch (error) {
            console.error('error al crear paciente', error)
            throw error;
        }
    },
    actualizarPaciente: async (id, paciente) =>{
        try {
            const {id_plan, nombre, apellido, dni, fecha_nacimiento, sexo} = paciente;
            await pool.execute(
                'UPDATE paciente SET id_plan = ?, nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, sexo = ? WHERE id = ?', 
                [id_plan, nombre, apellido, dni, fecha_nacimiento, sexo, id]
            );
        } catch (error) {
            console.error('error al actualizar paciente', error)
            throw error;
        }
    },
    eliminarPaciente: async (id) =>{
        try {
            await pool.execute(
                'DELETE FROM paciente WHERE id = ?', 
                [id]);
        } catch (error) {
            console.error('error al eliminar paciente', error)
            throw error;
        }
    },
    obtenerPacientePorId: async (id) =>{
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM paciente WHERE id = ?', 
                [id]);
            return rows[0];
        } catch (error) {
            console.error('error al obtener paciente', error)
            throw error;
        }
    }
}
