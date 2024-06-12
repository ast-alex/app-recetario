const Paciente = require('../models/Paciente');

exports.getPacientes = (req, res) =>{
    Paciente.getAll((error, results) =>{
        if(error){
            res.status(500).send(error);
        }
        else{
            res.render('pacientes', {pacientes: results});
        }
    });
};

exports.getPacienteById = (req, res) =>{
    const id = req.params.id;
    Paciente.getById(id, (error, paciente) =>{
        if(error){
            res.status(500).send(error);
        }
        else if(paciente){
            res.render('paciente', { paciente })
        }
        else{
            res.status(404).send('Paciente no encontrado');
        }
    });
};

exports.createPaciente = (req, res) =>{
    Paciente.create(req.body, (error, paciente) =>{
        if(error){
            res.status(500).send(error);
        }
        else{
            res.redirect('/pacientes')
        }
    });
};

exports.editPaciente = (req, res) =>{
    const id = req.params.id;
    Paciente.getById(id, (error, paciente) =>{
        if(error){
            res.status(500).send(error);
        }
        else if(paciente){
            res.render('form-paciente', { 
                title: 'Editar Paciente', 
                action: `/pacientes/${id}?_method=PUT`, 
                method: 'POST', 
                paciente,
                volverLista: true
            });
        }
        else{
            res.status(404).send('Paciente no encontrado');
        }
    });
}

exports.updatePaciente = (req, res) =>{
    const id = req.params.id;
    Paciente.update(id, req.body, (error, results) =>{
        if(error){
            res.status(500).send(error);
        }
        else{
            res.redirect('/pacientes');
        }
    });
};

exports.deletePaciente = (req, res) =>{
    const id = req.params.id;
    Paciente.delete(id, (error, results) =>{
        if(error){
            res.status(500).send(error)
        }else{
            res.redirect('/pacientes');
        }
    });
}
exports.buscarPacienteDni = (req, res) =>{
    const dni = req.query.dni;
    Paciente.getByDni(dni, (error, pacientes) =>{
        if(error){
            res.status(500).send(error);
        }else{
            res.render('pacientes', {pacientes});
        }
    });
}
