const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const pool = require('./config/config');
const pacienteRoutes = require('./routes/pacienteRoutes');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test-db', (req, res) => {
    pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error al obtener la base de datos');
            return;
        }
        res.send(`El resultado de la suma es: ${results[0].solution}`);
    })
})

app.use('/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { 
    console.log(`Server corriendo en el puerto ${PORT}`); 
});
