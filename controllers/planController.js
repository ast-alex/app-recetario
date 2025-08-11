const Plan = require('../models/Plan');

const PlanController = {
    getPlanes: async (req, res) => {
        try {
            const planes = await Plan.getAll();
            res.json(planes);
        } catch (error) {
            console.error('Error al obtener planes:', error);
            res.status(500).json({ error: 'Error al obtener planes' });
        }
    }
};

module.exports = PlanController;