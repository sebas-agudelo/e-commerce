import express from 'express';
import { categories, getProductByID, getProducts, getThreeProducts } from '../../controllers/products/productsCtrl.js';
import { searchProduct } from '../../controllers/products/searchCtrl.js';
import { productByCategory } from '../../controllers/products/productByCategory.js';

export const productsRouter = express.Router();

/* ALL PRODUCTS ROUTES */
productsRouter.get('/api/products/show', getProducts);
productsRouter.get('/api/product/get/:id', getProductByID);
productsRouter.get('/api/categori/get', categories)
productsRouter.get('/api/selected/products', getThreeProducts)
productsRouter.get('/search', searchProduct);
productsRouter.get('/api/product/categori/:categoryID', productByCategory);











