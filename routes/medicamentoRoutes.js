const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../auth/authMiddleware');
const medicamentoController = require('../controllers/medicamentoController');


router.get('/crear', verifyToken, checkRole([2]), medicamentoController.mostrarFormCreacion);

// Obtener todos los medicamentos
router.get('/', verifyToken, checkRole([2]), medicamentoController.getAll);

//obtener form edicion
router.get('/editar/:id', verifyToken, checkRole([2]), medicamentoController.mostrarFormEdicion);

//actualizar
router.put('/editar/:id', verifyToken, checkRole([2]), medicamentoController.update);

//actualizar estado
router.put('/estado/:id', verifyToken, checkRole([2]), medicamentoController.updateEstado);

// Obtener un medicamento por ID
router.get('/:id', verifyToken, checkRole([2]), medicamentoController.getById);

// Crear un nuevo medicamento
router.post('/crear', verifyToken, checkRole([2]), medicamentoController.create);

//vista detalles
router.get('/detalles/:id', verifyToken, checkRole([2]), medicamentoController.verDetalles);

module.exports = router;
