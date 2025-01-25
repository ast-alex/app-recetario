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

const app = express();
require('dotenv').config();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/home', (req, res) => {
    //verificar si hay token
    const token = req.cookies.token;

    if(!token){
        return res.redirect('/auth/login');
    }

    try{
        //verificar el token
        jwt.verify(token, process.env.JWT_SECRET);
        // Si el token es valido, renderizo la vista de home(principal)
        res.render('home', { message: 'Bienvenido al sistema' });
    }catch(error){
        console.log('Error al verificar el token', error);
        return res.redirect('/auth/login');
    }
})


app.use('/auth', authRoutes); 

app.use('/pacientes', pacienteRoutes);
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.use('/prescripciones', prescripcionRoutes);

app.use('/planes', planRoutes);

app.use("/profesionales", profesionalRoutes);

app.use("/usuarioAdmin", usuarioAdminRoutes);

app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { 
    console.log(`Server corriendo en el puerto ${PORT}`); 
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error interno del servidor');
});


app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
})