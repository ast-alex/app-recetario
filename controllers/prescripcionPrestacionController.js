const PrescripcionPrestacion = require('../models/prescripcionPrestacion');

const prescripcionPrestacionController = {
    async registrarResultadoYObservacion(req, res) {
        try {
            const { id_prescripcion_prestacion } = req.params;
            const { resultado, observacion } = req.body;

            if(!resultado && !observacion) {
                return res.status(400).json({ error: 'El resultado y la observación son obligatorios' });
            }

            const updated = await PrescripcionPrestacion.updateObservacionYResultado(id_prescripcion_prestacion, observacion, resultado);

            if(!updated) {
                return res.status(404).json({ error: 'Prestación no encontrada o sin cambios' });
            }

            return res.status(200).json({ message: 'Observación y resultado actualizados correctamente' });
        } catch (error) {
            console.error('Error al registrar el resultado y la observación:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = prescripcionPrestacionController;