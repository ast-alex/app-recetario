const FormaFarmaceutica = require('../models/FormaFarmaceutica.js');

const formaFarmaceuticaController = {
    getFormasByMedicamento: async (req, res) => {
        try{
            const { id_medicamento } = req.params;
            const formas = await FormaFarmaceutica.getByMedicamento(id_medicamento);
            res.json({ success: true, formas });
        }catch (error){
            res.status(500).json({success: false, message: 'Error al obtener las formas', error: error.message});   
        }
    },

    addForma: async (req, res) => {
        const { nombre, id_medicamento } = req.body;
        try{
            const nuevaForma = await FormaFarmaceutica.add(id_medicamento, nombre);
                res.json({ success: true, message: 'Forma farmaceutica agregada correctamente', id_forma_farmaceutica: nuevaForma.id_forma_farmaceutica });
        }catch (error){
            res.status(500).json({success: false, message: 'Error al agregar la forma', error: error.message});
        }
        
    },

    editForma: async (req, res) => {
        const { id_forma_farmaceutica } = req.params;
        const { nombre, id_medicamento } = req.body;
        try{
            const updated = await FormaFarmaceutica.update(id_forma_farmaceutica, {nombre, id_medicamento});
            if(updated.affectedRows > 0) {
                res.json({success: true, message: 'Forma farmaceutica actualizada correctamente'});
            } else {
                res.status(404).json({success: false, message: 'Forma farmaceutica no encontrada'});
            }
        }catch (error){
            res.status(500).json({success: false, message: 'Error al actualizar la forma', error: error.message});
        }
    },

    deleteForma: async (req, res) => {
        const { id_forma_farmaceutica } = req.params;
        try{
            const eliminado = await FormaFarmaceutica.delete(id_forma_farmaceutica);
            if(eliminado.affectedRows > 0) {
                res.json({success: true, message: 'Forma farmaceutica eliminada correctamente'});
            } else {
                res.status(404).json({success: false, message: 'Forma farmaceutica no encontrada'});
            }
        }catch (error){
            res.status(500).json({success: false, message: 'Error al eliminar la forma', error: error.message});
        }
    }
}

module.exports = formaFarmaceuticaController