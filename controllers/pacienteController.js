const pool = require('../config/config');
const paciente = require('../models/Paciente');

const buscarPaciente = async (req, res) => {
    try {
        const { term } = req.query;
        if (!term) {
            return res.status(400).send('El término de búsqueda es requerido');
        }
        const pacientes = await paciente.buscarPaciente(term);
        res.render('paciente/buscar', { pacientes });
    } catch (error) {
        console.error('Error en el controlador al buscar pacientes:', error.message);
        res.status(500).send('Error al buscar paciente');
    }
};

module.exports = {
    buscarPaciente,
    crearPaciente: async (req, res) => {
        try {
            const paciente = req.body;
            const id = await paciente.crearPaciente(paciente);
            res.status(201).json({ id });
        } catch (error) {
            console.error(error, 'al crear paciente');
            res.status(500).send('Error al crear paciente');
        }
    },

    actualizarPaciente : async (req, res) => {
        try {
            const { id } = req.params;
            const paciente = req.body;
            await paciente.actualizarPaciente(id, paciente);
            res.status(200).send('Paciente actualizado');
        } catch (error) {
            console.error(error, 'al actualizar paciente');
            res.status(500).send('Error al actualizar paciente');
        }
    },
    eliminarPaciente: async (req, res) => {
        try {
            const { id } = req.params;
            await paciente.eliminarPaciente(id);
            res.status(200).send('Paciente eliminado');
        } catch (error) {
            console.error(error, 'al eliminar paciente');
            res.status(500).send('Error al eliminar paciente');
        }
    },
    obtenerPacientePorId: async (req, res) => {
        try {
            const { id } = req.params;
            const paciente = await obtenerPacientePorId(id);
            res.status(200).json(paciente);
        } catch (error) {
            console.error(error, 'al obtener paciente');
            res.status(500).send('Error al obtener paciente');
        }
    }
}