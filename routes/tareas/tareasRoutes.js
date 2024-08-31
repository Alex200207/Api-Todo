import { Router } from 'express';
// import verifyToken from '../middleware.js';
import {
    allController,
  findController,
  createController,
  updateController,
  deleteController
} from '../../controllers/tareas/tareasController.js';

const tareasRouter = Router();

//Proteger todas las rutas de este archivo
// POR EL MOMENTO SE COMENTA PARA PODER PROBAR LAS RUTAS SIN NECESIDAD DE UN TOKEN
//notasRouter.use(verifyToken);

// Rutas para la entidad de notas
tareasRouter.get('/', allController);
tareasRouter.get('/:id', findController);
tareasRouter.post('/', createController);
tareasRouter.put('/:id', updateController);
tareasRouter.delete('/:id', deleteController);

export default tareasRouter;
