import express from 'express';
import { stripeCheckOut } from '../../controllers/stripe/checkOut.js';

export const paymentRouter = express.Router();

/* ALL PAYMENT ROUTES */
paymentRouter.post('/create-payment-intent', stripeCheckOut);








