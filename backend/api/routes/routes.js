import express from 'express';
import { sessionAuthCheck, signIn, signOut, authenticateUser, profile, insertUserData, insert } from '../controllers/auth/sessionManagement.js'
import { addToCart, updateCartQty, deleteCart, showCart } from '../controllers/cart/addToCartCtrl.js';
import { customerAuthOrders, customerOrders, showCostumersOrders } from '../controllers/orders/ordersCtrl.js';
import { stripeCheckOut } from '../controllers/stripe/checkOut.js';
import { categories, getProductByID, getProducts, searchProduct, productByCategory } from '../controllers/products/productsCtrl.js';

export const routes = express.Router();

/* ALL AUTH ROUTES */
routes.post('/auth/signin', signIn);
routes.post('/auth/signout', signOut);
routes.get('/auth/profile', authenticateUser, profile); 
routes.get('/auth/sessionAuthCheck', sessionAuthCheck);
routes.put('/auth/register/information', authenticateUser, insertUserData);
routes.post('/auth/register', authenticateUser, insert);

/* ALL PRODUCTS ROUTES */
routes.get('/api/products/show', getProducts);
routes.get('/api/product/get/:id', getProductByID);
routes.get('/api/categori/get', categories)
routes.get('/search', searchProduct);
routes.get('/api/product/categori/:selectedCatId', productByCategory);
/* ALL CART ROUTES */
routes.post('/api/cart/addtocart', authenticateUser, addToCart);
routes.put('/api/cart/update', authenticateUser, updateCartQty);
routes.delete('/api/cart/delete', authenticateUser, deleteCart);
routes.get('/api/cart/show', authenticateUser, showCart);
routes.post('/api/order/insert', authenticateUser, customerAuthOrders);
routes.post('/api/order/guestorder', customerOrders);
routes.get('/api/order/myorders',authenticateUser, showCostumersOrders);

/* STRIPE ROUTE */
routes.post('/create-payment-intent', stripeCheckOut);
