import express from 'express';
import { categories, deleteProductByID, getProductByID, getProducts, getThreeProducts } from '../../controllers/products/productsCtrl.js';
import { newProduct, upload } from '../../controllers/products/newProduct.js';
import { authenticateAdmin, authenticateUser } from '../../controllers/auth/middlewares/AuthMiddlewares.js';
import { updateProduct } from '../../controllers/products/updateProduct.js';
import { searchProduct } from '../../controllers/products/searchCtrl.js';
import { productByCategory } from '../../controllers/products/productByCategory.js';



export const productsRouter = express.Router();

/* ALL PRODUCTS ROUTES */
productsRouter.post('/api/product/create', upload.single('img'), authenticateUser, authenticateAdmin, newProduct);
productsRouter.get('/api/products/show', getProducts);
productsRouter.get('/api/product/get/:id', getProductByID);
productsRouter.delete('/api/product/delete/:id', authenticateUser, authenticateAdmin, deleteProductByID);
productsRouter.get('/api/categori/get', categories)
productsRouter.get('/api/selected/products', getThreeProducts)
productsRouter.put('/api/product/update/:id', upload.single('img'), authenticateUser, authenticateAdmin, updateProduct)
productsRouter.get('/search', searchProduct);
productsRouter.get('/api/product/categori/:categoryID', productByCategory);











