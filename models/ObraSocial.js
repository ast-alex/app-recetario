const pool = require('../config/config');

class ObraSocial {
    constructor(id_obra_social, nombre) {    
        this.id_obra_social = id_obra_social;
        this.nombre = nombre;
    }
}

module.exports = ObraSocial