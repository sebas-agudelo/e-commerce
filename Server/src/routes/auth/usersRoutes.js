import express from 'express';
import { blabla, createNewUser } from '../../controllers/auth/users.js';

export const router = express.Router();

router.post('/api/createuser', createNewUser);
router.post('/confirm/:token/:email', blabla);
