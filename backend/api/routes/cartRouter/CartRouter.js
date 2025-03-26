import express from 'express';
import { addToCart, updateCartQty, deleteCart, showCart } from '../../controllers/cart/addToCartCtrl.js';
import { authenticateUser } from '../../controllers/auth/sessionManagement/sessionManagement.js';
import { customerAuthOrders, customerOrders } from '../../controllers/orders/ordersCtrl.js';

export const cartRouter = express.Router();

cartRouter.post('/api/cart/addtocart', authenticateUser, addToCart);
cartRouter.put('/api/cart/update', authenticateUser, updateCartQty);
cartRouter.delete('/api/cart/delete', authenticateUser, deleteCart);
cartRouter.get('/api/cart/show', authenticateUser, showCart);
cartRouter.post('/api/order/insert', authenticateUser, customerAuthOrders);
cartRouter.post('/api/order/guestorder', customerOrders);


