import express from 'express';
import { sessionAuthCheck, validateAdminRole, signIn, signOut } from '../../controllers/auth/sessionManagement/sessionManagement.js';
import { passwordResetLink, resetPassword } from '../../controllers/auth/passwordReset/passwordReset.js';
import { signUpUser, verifyEmail } from '../../controllers/auth/userRegistration/userRegistration.js';
import { insertUserData, profile } from '../../controllers/auth/profile.js';
import { authenticateUser } from '../../controllers/auth/middlewares/AuthMiddlewares.js';


export const authRouter = express.Router();

/* ALL AUTH ROUTES */
authRouter.post('/auth/signup', signUpUser);
authRouter.post('/confirm/:tokenHash', verifyEmail);
authRouter.post('/auth/signin', signIn);
authRouter.post('/auth/signout', signOut);
authRouter.post('/auth/passwordresetlink', passwordResetLink);
authRouter.post('/auth/resetpassword/:tokenHash', resetPassword);
authRouter.get('/auth/profile', authenticateUser, profile); 
authRouter.get('/auth/sessionAuthCheck', sessionAuthCheck);
authRouter.get('/auth/validateAdminRole', validateAdminRole);
authRouter.post('/auth/register/information', authenticateUser, insertUserData);






