const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { checkRole, verifyToken } = require('../auth/authMiddleware');
const Usuario = require('../models/Usuario');

router.get('/crear-admin', verifyToken, checkRole([2]), async (req, res) => {
  try {
    const usuarios = await Usuario.getAllAdmin(); // recuerda que migrar getAllAdmin para que retorne Promise
    const mensajeExito = req.query.success ? "Usuario creado con éxito!!" : null;
    res.render('form-admin', { usuarios, mensajeExito });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post('/crear-admin', verifyToken, checkRole([2]), usuarioController.createAdmin);

router.put('/cambiar-password', verifyToken, checkRole([ 1, 2]), usuarioController.updatePassword);

router.get('/miperfil', verifyToken, checkRole([1,2]), usuarioController.renderPerfil);

module.exports = router;
