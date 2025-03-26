import express from 'express';
import { sessionAuthCheck, validateAdminRole, signIn, signOut, authenticateUser, profile, insertUserData } from '../../controllers/auth/sessionManagement/sessionManagement.js';

export const authRouter = express.Router();

/* ALL AUTH ROUTES */
authRouter.post('/auth/signin', signIn);
authRouter.post('/auth/signout', signOut);
authRouter.get('/auth/profile', authenticateUser, profile); 
authRouter.get('/auth/sessionAuthCheck', sessionAuthCheck);
authRouter.get('/auth/validateAdminRole', validateAdminRole);
authRouter.post('/auth/register/information', authenticateUser, insertUserData);
