const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../auth/authMiddleware');
const planController = require('../controllers/planController');

router.get('/', verifyToken, checkRole([1,2]), planController.getPlanes);

module.exports = router;