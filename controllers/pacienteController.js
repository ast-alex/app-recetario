const Paciente = require('../models/Paciente');

exports.getPacientes = async (req, res) => {
  const error_msg = req.query.error_msg || null;
  try {
    const pacientes = await Paciente.getAll();
    res.render('pacientes', { pacientes, error_msg });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getPacienteById = async (req, res) => {
  try {
    const id = req.params.id;
    const paciente = await Paciente.getById(id);
    res.render('paciente', { paciente });
  } catch (error) {
    if (error.message === 'Paciente no encontrado') {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

exports.createPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);
    res.json({ success: true, message: 'Paciente agregado correctamente', paciente });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar paciente' });
  }
};

exports.editPaciente = async (req, res) => {
  try {
    const id = req.params.id;
    const paciente = await Paciente.getById(id);
    res.render('form-paciente', {
      title: 'Editar Paciente',
      action: `/pacientes/${id}`,
      method: 'PUT',
      paciente,
      volverLista: true
    });
  } catch (error) {
    if (error.message === 'Paciente no encontrado') {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

exports.updatePaciente = async (req, res) => {
  try {
    const id = req.params.id;
    await Paciente.update(id, req.body);
    res.json({ success: true, message: 'Paciente actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el paciente' });
  }
};

exports.deletePaciente = async (req, res) => {
  try {
    const id = req.params.id;
    const exito = await Paciente.darBaja(id);

    if(exito){
      res.json({ success: true, message: 'Paciente dado de baja correctamente' });
    }else{
      res.status(404).json({ success: false, message: 'Paciente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el paciente' });
  }
};

exports.buscarPacienteDni = async (req, res) => {
  try {
    const dni = req.query.dni;
    const pacientes = await Paciente.getByDni(dni);
    res.json(pacientes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.toggleEstado = async (req, res) => {
  const id = req.params.id;
  const paciente = await Paciente.getById(id);
  const nuevoEstado = paciente.activo === 'activo' ? 'inactivo' : 'activo';

  const actualizado = await Paciente.setActivo(id, nuevoEstado);
  if (actualizado) {
    res.json({ success: true, message: `Paciente ${nuevoEstado ? 'activado' : 'desactivado'} correctamente.` });
  } else {
    res.status(500).json({ success: false, error: 'No se pudo actualizar el estado.' });
  }
}


