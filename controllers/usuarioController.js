const Usuario = require('../models/Usuario.js');

const usuarioController = {
    createAdmin: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        try {
            // Crear usuario con rol de administrador (id_rol = 2)
            const nuevoUsuario = { email, password, id_rol: 2 };
            const usuarioCreado = await Usuario.create(nuevoUsuario);

            res.status(201).json({ message: 'Usuario administrador creado exitosamente.', usuario: usuarioCreado });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el usuario administrador.' });
        }
    }
}

module.exports = usuarioController;