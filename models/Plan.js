const pool = require('../config/config');

class Plan {
    constructor(id_plan, id_obra_social, nombre, cobertura){
        this.id_plan = id_plan;
        this.id_obra_social = id_obra_social;
        this.nombre = nombre;
        this.cobertura = cobertura;
    }
}

module.exports = Plan