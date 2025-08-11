const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../auth/authMiddleware");
const concentracionController = require("../controllers/concentracionController");

router.get("/:id_medicamento", verifyToken, checkRole([2]), concentracionController.getConcentracionesByMedicamento);

router.put("/editar/:id_concentracion", verifyToken, checkRole([2]), concentracionController.editConcentracion);

router.post("/agregar", verifyToken, checkRole([2]), concentracionController.agregarConcentracion);

router.delete("/eliminar/:id_concentracion", verifyToken, checkRole([2]), concentracionController.deleteConcentracion);

module.exports = router;
