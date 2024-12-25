import express from 'express';
import {confirmSignup, createNewUser, login, logout, recavoryPwdLink, resetpwd } from '../../controllers/auth/users.js';

export const router = express.Router();

router.post('/auth/createuser', createNewUser);
router.post('/confirm/:tokenHash', confirmSignup);
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.post('/auth/recavorpwdlink', recavoryPwdLink);
router.post('/auth/resetpwd/:tokenHash', resetpwd);





