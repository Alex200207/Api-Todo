import {
  queryAll,
  queryFind,
  queryCreate,
  queryUpdate,
  queryDelete
} from "../../db/tareas/tareasQueries.js";

/**
 * Obtener todos los tareas de la base de datos
 */
const allController = async (req, res) => {
  // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
  // Try -> intentar
  // Catch -> capturar el error
  try {
    //  Ejecutar la consulta en la base de datos
    const tareas = await queryAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Obtener el tarea con el ID especificado en la query / url
 * @param {*} req 
 * @param {*} res 
 */

const findController = async (req, res) => { 
  try {
    //  Ejecutar la consulta en la base de datos
    const tarea = await queryFind(req.params.id);
    res.json(tarea);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Crear un tarea
 */
const createController = async (req, res) => {
  try {
      const datostarea = req.body;
      const resultado = await queryCreate(datostarea);
      res.json({ mensaje: 'Tarea creada con éxito', id: resultado.insertId });
  } catch (error) {
      res.status(500).send(error);
  }
};

/**
 * Actualizar los datos de un tarea
 */
const updateController = async (req, res) => {
  try {
      const id = req.params.id;
      const datostarea = req.body;
      const resultado = await queryUpdate(id, datostarea);
      if (resultado.affectedRows > 0) {
          res.json({ mensaje: 'Tarea actualizada con éxito', tarea: resultado });
      } else {
          res.status(404).json({ mensaje: 'Tarea no encontrada' });
      }
  } catch (error) {
      res.status(500).send(error);
  }
};

/**
 * Eliminar un tarea
 */
const deleteController = async (req, res) => {
  try {
      const id = req.params.id;
      const resultado = await queryDelete(id);
      if (resultado.affectedRows > 0) {
          res.json({ mensaje: 'Tarea eliminada con éxito' });
      } else {
          res.status(404).json({ mensaje: 'Tarea no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar la tarea', error: error.message });
  }
};

export {
  allController,
  findController,
  createController,
  updateController,
  deleteController
};
