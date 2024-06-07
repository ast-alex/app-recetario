const Paciente = require('../models/Paciente');
const Medicamento = require('../models/Medicamento');
const Prestacion = require('../models/Prestacion');
const Prescripcion = require('../models/Prescripcion');

module.exports = {
    index: async (req, res) => {
        try {
            const pacientes = await Paciente.findAll();
            res.render('index', {pacientes: pacientes});
        } catch (error) {
            console.error(error, 'al obtener pacientes');
        }
    },
    buscarPaciente: async (req, res) => {
        const { term } = req.query;
        const pacientes = await Paciente.search( term );
        res.json(pacientes);
    },
    buscarMedicamento: async (req, res) => {
        const { term } = req.query;
        const medicamentos = await Medicamento.search( term );
        res.json(medicamentos);
    },
    buscarPrestacion: async (req, res) => {
        const { term } = req.query;
        const prestaciones = await Prestacion.search( term );
        res.json(prestaciones);
    },

    create: async (req, res) => {
        const {id_profesional_salud, id_paciente, diagnostico, medicamentos, prestaciones  } = req.body;
        try {
            const prescripcion = await Prescripcion.create({id_profesional_salud, id_paciente, diagnostico });
            //guarda medicamentos y prestaciones asociados a la prescripcion
            for(const medicamento of medicamentos){
                await prescripcion.addMedicamento(id.prescipcion, medicamento);
            }
            for(const prestacion of prestaciones){
                await prescripcion.addPrestacion(id.prescipcion, prestacion);
            }
            res.redirect('/prescripcion/${id.prescipcion}');
        } catch (error) {
            console.error(error, 'al crear prescripcion');
            res.send('error al crear prescripcion');
        }
    }

}