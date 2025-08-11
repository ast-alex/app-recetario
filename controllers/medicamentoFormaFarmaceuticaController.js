const MedicamentoFormaFarmaceutica =  require('../models/medicamentoFormaFarmaceutica');

const medicamentoFormaFarmaceuticaController = {
    obtenerFormas: (req, res) =>{
        const {id_medicamento} = req.params;

        MedicamentoFormaFarmaceutica.getByMedicamento(id_medicamento, (err, formas) => {
            if (err) return res.status(500).json({ success: false, message: 'Error al obtener las formas farmaceuticas' });
            res.json({ success: true, formas });
        });
    },

    agregarForma: (req, res) => {
        const { id_medicamento, id_forma_farmaceutica } = req.body;
        MedicamentoFormaFarmaceutica.add(id_medicamento, id_forma_farmaceutica, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Error al agregar la forma farmaceutica' });
            res.json({ success: true, message: 'Forma farmaceutica agregada correctamente' });
        });
    },

    eliminarForma: (req, res) =>{
        const { id_medicamento, id_forma_farmaceutica } = req.body;
        MedicamentoFormaFarmaceutica.remove(id_medicamento, id_forma_farmaceutica, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Error al eliminar la forma farmaceutica' });
            res.json({ success: true, message: 'Forma farmaceutica eliminada correctamente' });
        });
    },

    eliminarTodas: (req, res) => {
        const { id_medicamento } = req.params;
        MedicamentoFormaFarmaceutica.removeAllByMedicamento(id_medicamento, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: 'Error al eliminar las formas farmaceuticas' });
            res.json({ success: true, message: 'Formas farmaceuticas eliminadas correctamente' });
        });
    }
};

module.exports = medicamentoFormaFarmaceuticaController