import {Router} from 'express';
import CrudController from '../controllers/CrudController';

const router  = new Router;
const crudController = new CrudController;

router
    .get('/', crudController.read)
    .post('/', crudController.create)
    .put('/:id', crudController.update)
    .delete('/:id', crudController.delete);

export default router