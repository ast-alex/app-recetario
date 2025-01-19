const Plan = require('../models/Plan');

const PlanController = {
    getPlanes: (req, res) => {
        Plan.getAll((error, planes) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al obtener los planes' });
            }
            res.json(planes);
        });
    }
};

module.exports = PlanController;