const ProfesionalSalud = require('../models/Profesional.js');

const profesionalController = {
    // Obtener todos los profesionales de salud
    getAllProfesionales: (req, res) => {
        ProfesionalSalud.getAll((err, profesionales) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json(profesionales);
            }
        });
    },

    // Obtener un profesional de salud por ID
    getProfesionalById: (req, res) => {
        const profesionalId = req.params.id;
        ProfesionalSalud.getById(profesionalId, (err, profesional) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (profesional) {
                res.status(200).json(profesional);
            } else {
                res.status(404).json({ error: 'Profesional de salud no encontrado' });
            }
        });
    },

    // Validar un ID Refeeps
    validarRefeps: (req, res) => {
        const { id_refeeps } = req.params;
        ProfesionalSalud.getAll((err, profesionales) => {
            if (err) {
                console.error("Error al validar el ID Refeeps:", err);
                return res.status(500).json({ error: "Error interno del servidor" });
            }

            const profesional = profesionales.find(p => p.id_refeeps === id_refeeps);

            if (profesional) {
                res.status(200).json({ 
                    valido: true,
                    message:  `El ID REFEPS pertenece al profesional ${profesional.nombre} ${profesional.apellido}.`,
                });
            } else {
                res.status(404).json({ 
                    valido: false,
                    message: "El ID REFEPS no pertenece a ningúno profesional de salud.",
                });
            }
        });
    },
};

module.exports = profesionalController