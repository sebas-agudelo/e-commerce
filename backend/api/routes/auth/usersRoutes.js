import express from 'express';
import { sessionAuthCheck, validateAdminRole, signIn, signOut } from '../../controllers/auth/sessionManagement/sessionManagement.js';
import { insertUserData, profile } from '../../controllers/auth/profile.js';
import { authenticateUser } from '../../controllers/auth/middlewares/AuthMiddlewares.js';

export const authRouter = express.Router();

/* ALL AUTH ROUTES */
authRouter.post('/auth/signin', signIn);
authRouter.post('/auth/signout', signOut);
authRouter.get('/auth/profile', authenticateUser, profile); 
authRouter.get('/auth/sessionAuthCheck', sessionAuthCheck);
authRouter.get('/auth/validateAdminRole', validateAdminRole);
authRouter.post('/auth/register/information', authenticateUser, insertUserData);






