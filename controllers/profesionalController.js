const ProfesionalSalud = require('../models/Profesional.js');
const Usuario = require('../models/Usuario.js');
const bcrypt = require('bcryptjs');

const profesionalController = {
  getAllProfesionales: async (req, res) => {
    try {
      const profesionales = await ProfesionalSalud.getAll({incluirInactivos: true});
      res.render('profesionales', { profesionales });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getProfesionalById: async (req, res) => {
    try {
      const profesionalId = req.params.id;
      const profesional = await ProfesionalSalud.getById(profesionalId);
      res.status(200).json(profesional);
    } catch (err) {
      if (err.message === 'Profesional de salud no encontrado') {
        res.status(404).json({ error: err.message });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  },

  validarRefeps: async (req, res) => {
    try {
      const { id_refeeps } = req.params;
      const profesionales = await ProfesionalSalud.getAll();

      const profesional = profesionales.find(p => p.id_refeeps === id_refeeps);

      if (profesional) {
        res.status(200).json({
          valido: true,
          message: `El ID REFEPS pertenece al profesional:] ${profesional.nombre} ${profesional.apellido}.`,
          profesional:{
            nombre: profesional.nombre,
            apellido: profesional.apellido,
            matricula: profesional.matricula,
            profesion: profesional.profesion,
            especialidad: profesional.especialidad
          }
        });
      } else {
        res.status(404).json({
          valido: false,
          message: "El ID REFEPS no pertenece a ningúno profesional de salud.",
        });
      }
    } catch (err) {
      console.error("Error al validar el ID Refeeps:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  createProfesional: async (req, res) => {
    const { email, password, nombre, apellido, dni, profesion, especialidad, domicilio, matricula, id_refeeps, fecha_caducidad } = req.body;

    if (!email || !password || !nombre || !apellido || !dni || !profesion || !especialidad || !domicilio || !matricula || !id_refeeps || !fecha_caducidad) {
      return res.status(400).render('form-profesional', { 
        mensajeError: 'Todos los campos son obligatorios!!' ,
        profesionales: await ProfesionalSalud.getAll()
      });
    }

    try {
      const profesionales = await ProfesionalSalud.getAll();

      //Verificar si el ID REFEEPS ya existe
      const yaExiste = profesionales.some(p =>
        p.id_refeeps?.toLowerCase() === id_refeeps.toLowerCase()
      );

      if(yaExiste) {
        return res.status(400).render('form-profesional', { 
          mensajeError: 'El ID REFEEPS ya está registrado. Por favor, utiliza otro ID REFEEPS.',
          profesionales 
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const usuarioCreado = await Usuario.create({ email, password: hashedPassword, id_rol: 1 });

      const fechaRegistro = new Date();
      const nuevoProfesional = {
        id_usuario: usuarioCreado.id_usuario,
        id_rol: 1,
        nombre,
        apellido,
        dni,
        profesion,
        especialidad,
        domicilio,
        matricula,
        id_refeeps,
        fecha_caducidad,
        fecha_registro: fechaRegistro,
        estado: 'activo'
      };

      await ProfesionalSalud.create(nuevoProfesional);
      res.redirect('/profesionales/crear?success=1');
    } catch (error) {
      console.error("Error al crear el profesional de salud:", error);
      res.status(500).render('form-profesional', { 
        mensajeError: "Error interno del servidor" ,
        profesionales: await ProfesionalSalud.getAll()
      });
    }
  },

  //baja profesional
  updateEstadoProfesional: async (req, res) => {
    try {
      const id_profesional_salud = req.params.id;  
      const {estado} = req.body;

      if(!['activo', 'inactivo'].includes(estado)){
        return res.status(400).json({ error: 'El estado no válido' });
      }

      const profesional = await ProfesionalSalud.getById(id_profesional_salud);
      if(!profesional){
        return res.status(404).json({ error: 'Profesional de salud no encontrado' });
      }

      const result = await ProfesionalSalud.updateEstado(id_profesional_salud, profesional.id_usuario, estado);
      res.json(result);
    } catch (error) {
      console.error("Error al eliminar el profesional de salud:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  updateCamposProfesional: async (req, res) => {
    try {
      const id_profesional_salud = req.params.id;
      const {domicilio,profesion,especialidad} = req.body;
      
      await ProfesionalSalud.updateCampos(id_profesional_salud, {domicilio,profesion,especialidad});
      res.json({ success: true, message: 'Profesional de salud actualizado correctamente' });
    } catch (error) {
          console.error("Error al actualizar el profesional de salud:", error);
          res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

module.exports = profesionalController;
