import express from 'express';
import { deleteProductByID, getProductByID, getProducts } from '../../controllers/products/products.js';
import { newProduct, upload } from '../../controllers/products/newProduct.js';


export const productsRouter = express.Router();

/* ALL PRODUCTS ROUTES */
productsRouter.post('/api/newproduct', upload.single('img'), newProduct);
productsRouter.get('/api/getproducts', getProducts);
productsRouter.get('/api/product/get/:id', getProductByID);

productsRouter.delete('/api/product/delete/:id', deleteProductByID);








