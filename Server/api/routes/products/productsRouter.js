import express from 'express';
import { deleteProductByID, getProductByID, getProducts } from '../../controllers/products/products.js';
import { newProduct, upload } from '../../controllers/products/newProduct.js';
import { authenticateAdmin, authenticateUser } from '../../controllers/auth/middlewares/AuthMiddlewares.js';


export const productsRouter = express.Router();

/* ALL PRODUCTS ROUTES */
productsRouter.post('/api/newproduct', upload.single('img'), authenticateUser, authenticateAdmin, newProduct);
productsRouter.get('/api/getproducts', getProducts);
productsRouter.get('/api/product/get/:id', getProductByID);
productsRouter.delete('/api/product/delete/:id', authenticateUser, authenticateAdmin, deleteProductByID);








