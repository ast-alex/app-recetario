const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const methodOverride = require("method-override");
const path = require("path");
const pacienteRoutes = require('./routes/pacienteRoutes');
const prescripcionRoutes = require('./routes/prescripcionRoutes');
const planRoutes = require('./routes/planRoutes');
const profesionalRoutes = require('./routes/profesionalRoutes');
const usuarioAdminRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
const concentracionRoutes = require('./routes/concentracionRoutes');
const formaFarmaceuticaRoutes = require('./routes/formaFarmaceuticaRoutes');
const medicamento_concentracionRoutes = require('./routes/medicamentoConcentracionRoutes');
const prescripcionPrestacionRoutes = require('./routes/prescripcionPrestacionRoutes');
const { verifyToken } = require("./auth/authMiddleware");

const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use((req, res, next) => {
    const excludesPaths = [ '/' ,'/auth/login', '/auth/logout'];
    if (excludesPaths.includes(req.path)) {
       return next();
    } 
    verifyToken(req, res, next);// verificar el token para las demas rutas
});

app.get('/home', verifyToken,(req, res) => {
    res.render('home', {usuario: req.user,  message: `Bienvenido ${req.user.email}`, denegado: req.query.denegado === '1'});
})

app.use('/auth', authRoutes); 

app.use('/pacientes', pacienteRoutes);
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.use('/prescripciones', prescripcionRoutes);

app.use('/planes', planRoutes);

app.use('/profesionales', profesionalRoutes);

app.use('/medicamentos', medicamentoRoutes);

app.use('/concentraciones', concentracionRoutes);

app.use('/formaFarmaceuticas', formaFarmaceuticaRoutes);

app.use('/usuarioAdmin', usuarioAdminRoutes);

app.use('/concentraciones', medicamento_concentracionRoutes);

app.use('/prescripcion_prestacion', prescripcionPrestacionRoutes);

app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});


app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { 
    console.log(`Server corriendo en el puerto ${PORT}`); 
});