const MedicamentoConcentracion = require('../models/MedicamentoConcentracion');

const medicamentoConcentracionController = {
    obtenerConcentraciones: (req, res) => {
        const { id_medicamento } = req.params;

        MedicamentoConcentracion.getByMedicamento(id_medicamento, (err, data) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, concentraciones: data });
        });
    },

    agregarConcentracion: (req, res) => {
        const { id_medicamento, id_concentracion } = req.body;

        MedicamentoConcentracion.add(id_medicamento, id_concentracion, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, insertId: result.insertId });
        });
    },

    eliminarConcentracion: (req, res) => {
        const { id_medicamento, id_concentracion } = req.body;

        MedicamentoConcentracion.remove(id_medicamento, id_concentracion, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, message: 'Asociación eliminada correctamente' });
        });
    },

    eliminarTodas: (req, res) => {
        const { id_medicamento } = req.params;

        MedicamentoConcentracion.removeAllByMedicamento(id_medicamento, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, message: 'Todas las asociaciones eliminadas' });
        });
    },

    getAllConcentraciones: (req, res) => {
    Concentracion.getAll((err, concentraciones) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, concentraciones });
    });
},

};

module.exports = medicamentoConcentracionController;
