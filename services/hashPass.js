// ARCHIVO PARA HASHEAR LAS CONTRASEÑAS DE USUARIOS ANTERIORES A LA IMPLEMENTACION DE BCRYPT
const pool = require('../config/config');
const bcrypt = require('bcryptjs');

const hashearPasswords = async () => {
    try {
        // Obtener todos los usuarios
        const [usuarios] = await pool.query('SELECT id_usuario, password FROM usuario');

        for (const usuario of usuarios) {
            const { id_usuario, password } = usuario;

            // Verificar si la contraseña ya está hasheada (por ejemplo, si tiene menos de 60 caracteres)
            if (password.length < 60) {
                console.log(`Hasheando contraseña para el usuario con ID: ${id_usuario}`);
                
                // Generar hash
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                // Actualizar contraseña en la base de datos
                await pool.query('UPDATE usuario SET password = ? WHERE id_usuario = ?', [hashedPassword, id_usuario]);
            }
        }

        console.log('Contraseñas actualizadas correctamente.');
    } catch (error) {
        console.error('Error al hashear las contraseñas:', error);
    }
};

hashearPasswords();