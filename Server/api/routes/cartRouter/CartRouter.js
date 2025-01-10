import express from 'express';
import { addToCart, deleteCart, deleteProductFromCart, showCart } from '../../controllers/cart/cartControllers.js';

export const cartRouter = express.Router();

cartRouter.post('/api/cart/addtocart', addToCart);
cartRouter.get('/api/cart/show', showCart);
cartRouter.delete('/api/cart/delete/:id', deleteProductFromCart);
cartRouter.delete('/api/cart/deletecart', deleteCart);

