const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const pool = require('./config/config');
const pacienteRoutes = require('./routes/pacienteRoutes');
const prescripcionRoutes = require('./routes/prescripcionRoutes');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use('/pacientes', pacienteRoutes);
app.use('/prescripcion', prescripcionRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { 
    console.log(`Server corriendo en el puerto ${PORT}`); 
});


app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
})