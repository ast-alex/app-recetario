const Paciente = require('../models/Paciente');

exports.buscarPaciente = (req, res) => {
    res.render('buscar-paciente', { title: 'Buscar Paciente' });
}

exports.buscarPacientePost = (req, res) => {
    const { nombre } = req.body;
    Paciente.findByName(nombre, (error, pacientes) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.render('busqueda-paciente', { title: 'Resultados de Búsqueda', pacientes });
        }   
    });
}