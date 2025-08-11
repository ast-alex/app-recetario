const mysql = require('mysql2');        
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app-receta',
})

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
    connection.release();
});


module.exports = pool.promise();