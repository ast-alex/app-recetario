const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const pacienteRoutes = require('./routes/pacienteRoutes');
const prescripcionRoutes = require('./routes/prescripcionRoutes');
const planRoutes = require('./routes/planRoutes');
const profesionalRoutes = require('./routes/profesionalRoutes');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/pacientes', pacienteRoutes);
app.get('/', (req, res) => {
    res.redirect('/pacientes');
});

app.use('/prescripciones', prescripcionRoutes);

app.use('/planes', planRoutes);

app.use("/profesionales", profesionalRoutes);

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