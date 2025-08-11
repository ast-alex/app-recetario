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
            return res.status(400).render('form-admin', {
                mensajeError: 'Todos los campos son obligatorios' ,
                usuarios: await Usuario.getAllAdmin()
            });
        }

        try {
            const [existe] = await Usuario.getByEmail(email);
            if (existe) {
                return res.render('form-admin', { 
                    mensajeError: 'El email ya está registrado.', 
                    usuarios: await Usuario.getAllAdmin()
                });
            }

            // hash del password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Crear usuario con rol de administrador (id_rol = 2)
            const nuevoUsuario = { email, password: hashedPassword, id_rol: 2 };
            await Usuario.create(nuevoUsuario);

            return res.redirect('/usuarioAdmin/crear-admin?success=1');
        } catch (error) {
            console.error(error);
            return res.render('form-admin', { 
                mensajeError: 'Error al crear el administrador.',
                usuarios: await Usuario.getAllAdmin()
            });
        }
    },

    updatePassword: async (req, res) => {
        const id  = req.user.id_usuario;
        const { actual, nueva, confirmar } = req.body;

        if (!actual || !nueva || !confirmar) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (nueva !== confirmar) {
            return res.status(400).json({ success: false, error: 'Las contraseñas no coinciden' });
        }

        try {
            const usuario = await Usuario.getById(id);
            const coincide = await bcrypt.compare(actual, usuario.password);

            if (!coincide) {
                return res.status(401).json({ error: 'La contraseña actual no coincide' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(nueva, salt);
            await Usuario.updatePassword(id, hashedPassword);

            return res.json({ success: true, message: 'Contraseña actualizada correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al actualizar la contraseña' });
        }
    },

    renderPerfil: async (req, res) => {
        try {
            const usuario = await Usuario.getById(req.user.id_usuario);
            res.render('miperfil', { usuario });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el perfil del usuario' });  
        }
    }
}

module.exports = usuarioController;