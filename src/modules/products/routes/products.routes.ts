import { Router } from 'express';
import ProductController from '../controllers/ProductsController';

const productsRoutes = Router();
const productController = new ProductController();

productsRoutes.get('/', productController.index);
productsRoutes.get('/:id', productController.findOne);
productsRoutes.post('/', productController.create);
productsRoutes.put('/:id', productController.update);
productsRoutes.delete('/:id', productController.delete);

export default productsRoutes;
