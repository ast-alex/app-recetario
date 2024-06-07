const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

//buscar paciente
router.get('/buscar', pacienteController.buscarPaciente);

// //crear paciente
// router.get('/nuevo', (req, res)=>{
//     res.render('paciente/form');
// });
// router.post('/crear', pacienteController.crearPaciente);

// //obtener pacienteID
// router.get('/:id', pacienteController.obtenerPacientePorId);

// //actualizar paciente
// router.get('/edit/:id', async (req, res)=>{
//     try {
//         const {id} = req.params;
//         const paciente = await obtenerPacientePorId(id);
//         res.render('paciente/form', {paciente});
//     } catch (error) {
//         console.error(error, 'al obtener paciente para editar');
//         res.status(500).send('Error al obtener paciente para editar');
//     }
// });
// router.post('/update/:id', pacienteController.actualizarPaciente);

// //eliminar paciente
// router.get('/delete/:id', pacienteController.eliminarPaciente);

router.get('/prueba', (req, res)=>{
    res.send('prueba funcionamiento');
})

module.exports = router;