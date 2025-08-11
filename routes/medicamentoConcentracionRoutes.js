const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../auth/authMiddleware");
const medicamentoConcentracionController = require("../controllers/medicamentoConcentracionController");

// Obtener concentraciones asociadas a un medicamento
router.get("/:id_medicamento", verifyToken, checkRole([2]), medicamentoConcentracionController.obtenerConcentraciones);

// Asociar una concentración a un medicamento
router.post("/agregar", verifyToken, checkRole([2]), medicamentoConcentracionController.agregarConcentracion);

// Eliminar una concentración específica de un medicamento
router.delete("/eliminar", verifyToken, checkRole([2]), medicamentoConcentracionController.eliminarConcentracion);

// Eliminar todas las concentraciones asociadas a un medicamento
router.delete("/eliminar-todas/:id_medicamento", verifyToken, checkRole([2]), medicamentoConcentracionController.eliminarTodas);

module.exports = router;
