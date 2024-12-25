import express from 'express';
import { userSignUp, verifySignUp } from '../../controllers/auth/signUp/userSignUp.js';
import { signIn, signOut } from '../../controllers/auth/signIn_signOut/signInSignOut.js';
import { recavoryPwdLink, resetpwd } from '../../controllers/auth/recovery_pwd/recoveryPassword.js';


export const router = express.Router();

/* ALL AUTH ROUTES */
router.post('/auth/signup', userSignUp);
router.post('/confirm/:tokenHash', verifySignUp);
router.post('/auth/signin', signIn);
router.post('/auth/signout', signOut);
router.post('/auth/recavorpwdlink', recavoryPwdLink);
router.post('/auth/resetpwd/:tokenHash', resetpwd);




