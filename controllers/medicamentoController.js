const Medicamento = require('../models/Medicamento');
const Categoria = require('../models/Categoria');
const Familia = require('../models/Familia');
const Concentracion = require('../models/Concentracion');
const FormaFarmaceutica = require('../models/FormaFarmaceutica');
const Presentacion = require('../models/Presentacion');

const medicamentoController = {
    // obtener todos los medicamentos
    getAll: async (req, res) => {
        try {
            const medicamentos = await Medicamento.getAll();
            res.render('medicamentos', { medicamentos });
        } catch (error) {
            console.error("Error al obtener los medicamentos:", error);
            res.status(500).json({ error: error.message });
        }
    },

    // obtener un medicamento por ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const medicamento = await Medicamento.getById(id);
            if (!medicamento) return res.status(404).json({ error: 'Medicamento no encontrado' });
            res.json(medicamento);
        }catch (error) {
            console.error("Error al obtener el medicamento:", error);
            res.status(500).json({ error: error.message });
        }
    },
    
    //mostar form para crear medicamento
    // Controlador actualizado
    mostrarFormCreacion: async(req, res) => {
        try{
            const categorias = await Categoria.getAll();
            const familias = await Familia.getAll();
            const concentraciones = await Concentracion.getAll();
            const formasFarmaceuticas = await FormaFarmaceutica.getAll();
            
            res.render('form-medicamento', {
                categorias,
                familias,
                concentraciones,
                formasFarmaceuticas,
                concentracionesData: JSON.stringify(concentraciones),
                formasFarmaceuticasData: JSON.stringify(formasFarmaceuticas)
            });
        }catch (error) {
            console.error("Error al obtener las categorias:", error);
            res.status(500).json({ error: error.message });
        }
    },


    // Create
    create: async (req, res) => {
        const { nombre_generico, estado, id_categoria, id_familia, presentaciones } = req.body;

        // Validar que los datos obligatorios estén presentes
        if (!nombre_generico || !id_categoria || !id_familia || !Array.isArray(presentaciones) || presentaciones.length === 0) {
            return res.status(400).json({ error: 'Faltan datos obligatorios o presentaciones' });
        }

        // Validar que cada presentación tiene los campos requeridos
        for (const presentacion of presentaciones) {
            if (
                !presentacion.id_concentracion ||
                !presentacion.id_forma_farmaceutica ||
                !presentacion.nombre_comercial ||
                !presentacion.cantidad_unidades
            ) {
                return res.status(400).json({ error: 'Cada presentación debe incluir id_concentracion, id_forma_farmaceutica, nombre_comercial y cantidad_unidades' });
            }
        }

        try {
            const idInsertado = await Medicamento.create({
                nombre_generico,
                estado,
                id_categoria,
                id_familia,
                presentaciones
            });

            res.status(201).json({ message: 'Medicamento creado correctamente', id: idInsertado });
        } catch (error) {
            console.error("Error al crear el medicamento:", error);
            res.status(500).json({ error: error.message })
        }
    },

    //form Edicion
    mostrarFormEdicion: async (req, res) => {
        try{
            const { id } = req.params;
            const medicamento = await Medicamento.getById(id);
            if (!medicamento) return res.status(404).json({ error: 'Medicamento no encontrado' });  
            
            const categorias = await Categoria.getAll();
            const familias = await Familia.getAll();
            const concentraciones = await Concentracion.getAll();
            const formas = await FormaFarmaceutica.getAll();
            const presentaciones = await Presentacion.getByMedicamento(id);     
            
            medicamento.presentaciones = presentaciones;

            res.render('editMedicamento', { 
                id_medicamento: medicamento.id_medicamento, 
                medicamento,
                categorias, 
                familias, 
                concentraciones, 
                formas,
                presentaciones
            });
        } catch (error) {
            console.error("Error al obtener las categorias:", error);
            res.status(500).json({ error: error.message });
        }
    },

    //editMedicamento
    update: async (req, res) => {
        const { id } = req.params;
        const { presentaciones = [] } = req.body;

        //validacion presentacioones
        for(const presentacion of presentaciones){
            if(
                !presentacion.id_concentracion || 
                !presentacion.id_forma_farmaceutica || 
                !presentacion.nombre_comercial ||
                !presentacion.cantidad_unidades
            ){
                return res.status(400).json({ error: 'Cada presentación debe incluir todos loos campos requeridos'});
            }
        }

        try{
            const data = {
                ...req.body,
                id_medicamento: parseInt(id), //agrego el id
                presentaciones,
                eliminar_presentaciones: req.body.eliminar_presentaciones ?? []
            };

            console.log("Datos recibidos para update:", data);

            const result = await Medicamento.update(data);
            
            res.json({
                success: true, 
                message: 'Medicamento actualizado correctamente',
                id: result.id_medicamento,
                nuevasPresentaciones: result.nuevasPresentaciones
            });
            
        } catch (error) {
            console.error("Error al actualizar el medicamento:", error);
            res.status(500).json({ error: error.message });
        }
    },

    verDetalles: async(req, res) => {
        try{
            const id = req.params.id;
            const medicamento = await Medicamento.getByIdRelaciones(id);
            if(!medicamento) return res.status(404).json({error: 'Medicamento no encontrado'});

            res.render('detalles', {medicamento});
        }catch (error) {
            console.error("Error al obtener el medicamento:", error);
            res.status(500).json({ error: error.message });
        }
    },
    

    updateEstado: async (req, res) => {
        try{    
            const { id } = req.params;
            const { estado } = req.body;
            
            await Medicamento.updateEstado(id, estado);
            res.json({success: true, message: 'Estado actualizado correctamente'});
        }catch (error) {
            console.error("Error al actualizar el estado del medicamento:", error);
            res.status(500).json({ error: error.message });
        }

    }
}
module.exports = medicamentoController;