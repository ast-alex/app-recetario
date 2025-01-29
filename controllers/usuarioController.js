const Usuario = require('../models/Usuario.js');
const bcrypt = require('bcryptjs');

const usuarioController = {
    
    // obtener todos los usuarios ADMIN
    getAllAdmin: async (req, res) => {
        Usuario.getAllAdmin((err, usuarios) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json(usuarios);
            }
        })
    },
    
    createAdmin: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('form-admin', { mensajeError: 'Todos los campos son obligatorios' });
        }

        try {
            // hash del password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Crear usuario con rol de administrador (id_rol = 2)
            const nuevoUsuario = { email, password: hashedPassword, id_rol: 2 };
            const usuarioCreado = await Usuario.create(nuevoUsuario);

            // limpiar formulario y mostrar mensaje de exito
            res.redirect('/usuarioAdmin/crear-admin?success=1');
        } catch (error) {
            console.error(error);
            res.status(500).render('form-admin', { mensajeError: 'Error al crear el usuario' });
        }
    }
}

module.exports = usuarioController;