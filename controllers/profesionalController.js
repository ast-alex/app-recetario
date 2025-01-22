const ProfesionalSalud = require('../models/Profesional.js');
const Usuario = require('../models/Usuario.js');

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

    // Crear un profesional de salud
    createProfesional: async (req, res) => {
        const { email, password, nombre, apellido, dni, profesion, especialidad, domicilio, matricula, id_refeeps, fecha_caducidad } = req.body;

        if (!email || !password || !nombre || !apellido || !dni || !profesion || !especialidad || !domicilio || !matricula || !id_refeeps || !fecha_caducidad) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios!!' });
        }

        try {
            // Crear usuario con el rol de profesional de salud (id_rol = 1)
            const usuarioCreado = await Usuario.create({ email, password, id_rol: 1 });

            // Crear profesional de salud
            const fechaRegistro = new Date();
            const nuevoProfesional = {
                id_usuario: usuarioCreado.id_usuario,
                id_rol: 1,
                nombre,
                apellido,
                dni,
                profesion,
                especialidad,
                domicilio,
                matricula,
                id_refeeps,
                fecha_caducidad,
                fecha_registro: fechaRegistro,
            };

            const profesionalCreado = await ProfesionalSalud.create(nuevoProfesional);
            res.status(201).json({ message: 'Profesional de salud creado', profesional: profesionalCreado });
        } catch (error) {
            console.error("Error al crear el profesional de salud:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

};

module.exports = profesionalController