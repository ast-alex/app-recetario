const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../auth/authMiddleware');
const formaFarmaceuticaController = require('../controllers/formaFarmaceuticaController');

router.get('/:id_medicamento', verifyToken, checkRole([2]), formaFarmaceuticaController.getFormasByMedicamento);

router.put('/editar/:id_forma_farmaceutica', verifyToken, checkRole([2]), formaFarmaceuticaController.editForma);  

router.post('/agregar', verifyToken, checkRole([2]), formaFarmaceuticaController.addForma);

router.delete('/eliminar/:id_forma_farmaceutica', verifyToken, checkRole([2]), formaFarmaceuticaController.deleteForma);

module.exports = router;