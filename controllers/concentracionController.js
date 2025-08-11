const Concentracion = require('../models/Concentracion');

const concentracionController = {
    getConcentracionesByMedicamento: async (req, res) => {
        try {
            const { id_medicamento } = req.params;
            const concentraciones = await Concentracion.getByMedicamento(id_medicamento);
            res.json({ success: true, concentraciones });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getTodas: async (req, res) => {
        try {
            const concentraciones = await Concentracion.getAll();
            res.json({ success: true, concentraciones });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    agregarConcentracion: async (req, res) => {
        const { valor } = req.body;
        try {
            const nueva = await Concentracion.create(valor);
            res.json({ success: true, id_concentracion: nueva.id_concentracion });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    editConcentracion: async (req, res) => {
        const { id_concentracion } = req.params;
        const { valor } = req.body;

        try {
            const updated = await Concentracion.update(id_concentracion, valor);
            if (updated.affectedRows > 0) {
                res.json({ success: true, message: 'Actualizada correctamente' });
            } else {
                res.status(404).json({ success: false, message: 'No encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    deleteConcentracion: async (req, res) => {
        const { id_concentracion } = req.params;
        try {
            const eliminado = await Concentracion.delete(id_concentracion);
            if (eliminado.affectedRows > 0) {
                res.json({ success: true, message: 'Eliminada correctamente' });
            } else {
                res.status(404).json({ success: false, message: 'No encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};

module.exports = concentracionController;
