import express from 'express';
import { categories, deleteProductByID, getProductByID, getProducts } from '../../controllers/products/productsCtrl.js';
import { newProduct, upload } from '../../controllers/products/newProduct.js';
import { authenticateAdmin, authenticateUser } from '../../controllers/auth/middlewares/AuthMiddlewares.js';


export const productsRouter = express.Router();

/* ALL PRODUCTS ROUTES */
productsRouter.post('/api/product/create', upload.single('img'), authenticateUser, authenticateAdmin, newProduct);
productsRouter.get('/api/products/show', getProducts);
productsRouter.get('/api/product/get/:id', getProductByID);
productsRouter.delete('/api/product/delete/:id', authenticateUser, authenticateAdmin, deleteProductByID);
productsRouter.get('/api/categori/get', categories)








