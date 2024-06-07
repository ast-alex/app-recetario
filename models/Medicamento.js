const pool = require('../config');

async function findAll() {
    const [rows] = await pool.query('SELECT * FROM medicamento');
    return rows;
}

async function findById(id) {
    const [rows] = await pool.query('SELECT * FROM medicamento WHERE id = ?', [id]);
    return rows[0];
}

module.exports = {
    findAll,
    findById
}