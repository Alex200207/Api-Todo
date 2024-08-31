import config from '../../config.js';

// Funcion que ayuda a manejar la respuesta de la base de datos
const respuesta = (err, result, resolve, reject) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        resolve(result);
    }
};
/**
 * Carga la lista de tareas
 */
const queryAll = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM tareas', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un tarea por su ID (llave primaria)
 */
const queryFind = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM tareas WHERE id = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo tarea
 */
const queryCreate = async (tarea) => {
    const { titulo, completado } = tarea;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tareas (titulo, completado) VALUES (?, ?)';
        config.query(sql, [titulo, completado], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un tarea por su ID
 */
const queryUpdate = (id, tarea) => {
    const { titulo, completado } = tarea;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tareas SET titulo = ?, completado = ? WHERE id = ?';
        config.query(sql, [titulo, completado, id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un tarea por su ID
 */
const queryDelete = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM tareas WHERE id = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    queryAll,
  queryFind,
  queryCreate,
  queryUpdate,
  queryDelete
}
