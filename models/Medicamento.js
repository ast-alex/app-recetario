const pool = require('../config/config');
const Categoria = require('./Categoria');
const Familia = require('./Familia');


class Medicamento {
    constructor(id_medicamento, nombre_generico, estado, id_categoria, id_familia, categoria, familia) {
        this.id_medicamento = id_medicamento;
        this.nombre_generico = nombre_generico;
        this.estado = estado;
        this.id_categoria = id_categoria;
        this.id_familia = id_familia;
        this.categoria = categoria;
        this.familia = familia;
    }

    static async getAll() {
        const [results] = await pool.query('SELECT * FROM medicamento');
        const medicamentos = [];

        for(const row of results){
            const categoria = await Categoria.getById(row.id_categoria);
            const familia = await Familia.getById(row.id_familia);
            medicamentos.push({
                id_medicamento: row.id_medicamento,
                nombre_generico: row.nombre_generico,
                estado: row.estado,
                id_categoria: row.id_categoria,
                id_familia: row.id_familia,
                categoria,
                familia    
            });
        }

        return medicamentos;
    }

    static async getById(id) {
        const [results] = await pool.query('SELECT * FROM medicamento WHERE id_medicamento = ?', [id]);

        if(results.length === 0){
            throw new Error('Medicamento no encontrado');
        }

        return results[0];  
    }

    static async create(data) {
        const { nombre_generico, estado, id_categoria, id_familia, presentaciones } = data;

            const connection = await pool.getConnection();
            try{
                await connection.beginTransaction();

                //insetar medicamentto
                const [results] = await connection.query(
                    'INSERT INTO medicamento (nombre_generico, estado, id_categoria, id_familia) VALUES (?, ?, ?, ?)',
                    [nombre_generico, estado, id_categoria, id_familia]
                );

                const id_medicamento = results.insertId;

                //insertar presentaciones
                for (const p of presentaciones){
                    const { id_concentracion, id_forma_farmaceutica, nombre_comercial, cantidad_unidades } = p;
                    
                    if (
                        !id_concentracion || !id_forma_farmaceutica || 
                        id_concentracion === "undefined" || id_forma_farmaceutica === "undefined" 
                    ) {
                        throw new Error('Cada presentación debe incluir id_concentracion, id_forma_farmaceutica, nombre_comercial y cantidad_unidades');
                    }

                    await connection.query(
                        'INSERT INTO presentacion (id_medicamento, id_concentracion, id_forma_farmaceutica, nombre_comercial, cantidad_unidades) VALUES (?, ?, ?, ?, ?)',
                        [id_medicamento, id_concentracion, id_forma_farmaceutica, nombre_comercial, cantidad_unidades]  
                    );
                }

                //insertar conecntraciones
                const concentracionesUnicas = [...new Set(presentaciones.map(p => p.id_concentracion))];
                for (const id_concentracion of concentracionesUnicas){
                    await connection.query(
                        'INSERT INTO medicamento_concentracion (id_medicamento, id_concentracion) VALUES (?, ?)',
                        [id_medicamento, id_concentracion]
                    );
                }

                //insertar formas farmaceuticas
                const formasUnicas = [...new Set(presentaciones.map(p => p.id_forma_farmaceutica))];
                for (const id_forma_farmaceutica of formasUnicas){
                    await connection.query(
                        'INSERT INTO medicamento_forma_farmaceutica (id_medicamento, id_forma_farmaceutica) VALUES (?, ?)',
                        [id_medicamento, id_forma_farmaceutica]
                    );
                }

                //finalizo
                await connection.commit();
                return id_medicamento;  

            } catch (err) {
                await connection.rollback();
                throw err;
            } finally {
                connection.release();
            }  
    }

    // Método update en el modelo Medicamento
    static async update(data) {

        const nuevasPresentaciones = [];

        const {
            id_medicamento,
            nombre_generico,
            estado,
            id_categoria,
            id_familia,
            presentaciones = [],
            eliminar_presentaciones = []
        } = data;

        console.log("Actualizando medicamento ID:", id_medicamento);

        let connection;
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();

            // 1. Obtener datos actuales
            const [meds] = await connection.query(
                'SELECT * FROM medicamento WHERE id_medicamento = ?',
                [id_medicamento]
            );

            if (meds.length === 0) {
                throw new Error('Medicamento no encontrado');
            }

            const actual = meds[0];
            const nuevoNombre = nombre_generico ?? actual.nombre_generico;
            const nuevoEstado = estado ?? actual.estado;
            const nuevaCategoria = id_categoria ?? actual.id_categoria;
            const nuevaFamilia = id_familia ?? actual.id_familia;

            // 2. Actualizar datos básicos
            await connection.query(
                'UPDATE medicamento SET nombre_generico = ?, estado = ?, id_categoria = ?, id_familia = ? WHERE id_medicamento = ?',
                [nuevoNombre, nuevoEstado, nuevaCategoria, nuevaFamilia, id_medicamento]
            );

            // 3. Eliminar presentaciones marcadas
            if (eliminar_presentaciones.length > 0) {
                await connection.query(
                    'DELETE FROM presentacion WHERE id_presentacion IN (?) AND id_medicamento = ?',
                    [eliminar_presentaciones, id_medicamento]
                );
            }

            // 4. Procesar presentaciones
            for (const p of presentaciones) {
                const {
                    id_presentacion,
                    id_concentracion,
                    id_forma_farmaceutica,
                    nombre_comercial,
                    cantidad_unidades
                } = p;

                if (!id_concentracion || id_concentracion === "undefined" ||
                    !id_forma_farmaceutica || id_forma_farmaceutica === "undefined" ||
                    !nombre_comercial || !cantidad_unidades  
                ) {
                    throw new Error('Faltan campos en una presentación');
                }

                if (id_presentacion) {
                    await connection.query(
                        'UPDATE presentacion SET id_concentracion = ?, id_forma_farmaceutica = ?, nombre_comercial = ?, cantidad_unidades = ? WHERE id_presentacion = ? AND id_medicamento = ?',
                        [id_concentracion, id_forma_farmaceutica, nombre_comercial, cantidad_unidades, id_presentacion, id_medicamento]
                    );
                } else {
                    const [result] = await connection.query(
                        'INSERT INTO presentacion (id_medicamento, id_concentracion, id_forma_farmaceutica, nombre_comercial, cantidad_unidades) VALUES (?, ?, ?, ?, ?)',
                        [id_medicamento, id_concentracion, id_forma_farmaceutica, nombre_comercial, cantidad_unidades]
                    );

                    nuevasPresentaciones.push({
                        id_presentacion: result.insertId,
                        id_concentracion,
                        id_forma_farmaceutica,
                        nombre_comercial,
                        cantidad_unidades
                    });
                }
            }

            // 5. Actualizar asociaciones
            const [presentacionesFinales] = await connection.query(
                'SELECT id_concentracion, id_forma_farmaceutica FROM presentacion WHERE id_medicamento = ?',
                [id_medicamento]
            );

            const concentraciones = [...new Set(presentacionesFinales.map(p => p.id_concentracion))];
            const formas = [...new Set(presentacionesFinales.map(p => p.id_forma_farmaceutica))];

            await connection.query('DELETE FROM medicamento_concentracion WHERE id_medicamento = ?', [id_medicamento]);
            await connection.query('DELETE FROM medicamento_forma_farmaceutica WHERE id_medicamento = ?', [id_medicamento]);

            for (const id of concentraciones) {
                await connection.query(
                    'INSERT INTO medicamento_concentracion (id_medicamento, id_concentracion) VALUES (?, ?)',
                    [id_medicamento, id]
                );
            }

            for (const id of formas) {
                await connection.query(
                    'INSERT INTO medicamento_forma_farmaceutica (id_medicamento, id_forma_farmaceutica) VALUES (?, ?)',
                    [id_medicamento, id]
                );
            }

            await connection.commit();
            return {
                id_medicamento,
                nuevasPresentaciones
            };
        } catch (err) {
            if (connection) await connection.rollback();
            throw err;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getByIdRelaciones(id) {
        try{
            const [medicamentoRows] = await pool.query(
                `SELECT m.*, c.nombre AS categoria_nombre, f.nombre AS familia_nombre
                FROM medicamento m
                LEFT JOIN categoria c ON m.id_categoria = c.id_categoria
                LEFT JOIN familia f ON m.id_familia = f.id_familia
                WHERE m.id_medicamento = ?
                `, [id]);

            if (medicamentoRows.length === 0) return null;

            const medicamento = {
                ...medicamentoRows[0],
                categoria: {nombre: medicamentoRows[0].categoria_nombre},
                familia: {nombre: medicamentoRows[0].familia_nombre},
                presentaciones : []
            };

            const [presentaciones] = await pool.query(`
                SELECT p.*, 
                        co.valor AS concentracion_valor, 
                        ff.nombre AS forma_farmaceutica_nombre
                FROM presentacion p
                LEFT JOIN concentracion co ON p.id_concentracion = co.id_concentracion
                LEFT JOIN forma_farmaceutica ff ON p.id_forma_farmaceutica = ff.id_forma_farmaceutica
                WHERE p.id_medicamento = ?
                `, [id]);

                medicamento.presentaciones = presentaciones.map(p => ({
                    id_presentacion: p.id_presentacion,
                    nombre_comercial: p.nombre_comercial,
                    cantidad_unidades: p.cantidad_unidades,
                    concentracion: {valor: p.concentracion_valor},
                    forma_farmaceutica: {nombre: p.forma_farmaceutica_nombre}
                }))

                return medicamento;
            } catch (err) {
                console.error('Error en getByIdRelaciones',err);
                throw err;
            }
        }
        
    static async updateEstado(id, estado) {
        const [result] = await pool.query(
            'UPDATE medicamento SET estado = ? WHERE id_medicamento = ?', 
            [estado, id]
        );

        if(result.affectedRows === 0) {
            throw new Error('Medicamento no encontrado');
        }

        return result;
    }

    // borrado logico
    static async delete(id) {
        const [result] = await pool.query(
            'UPDATE medicamento SET estado = "inactivo" WHERE id_medicamento = ?', 
            [id]
        );

        if(result.affectedRows === 0) {
            throw new Error('Medicamento no encontrado');
        }

        return true;
    }

    
}


module.exports = Medicamento