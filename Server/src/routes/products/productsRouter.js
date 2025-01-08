import express from 'express';
import { getProducts, newProduct } from '../../controllers/products/products.js';

export const productsRouter = express.Router();

/* ALL PRODUCTS ROUTES */
productsRouter.post('/api/newproduct', newProduct);
productsRouter.get('/api/getproducts', getProducts);







