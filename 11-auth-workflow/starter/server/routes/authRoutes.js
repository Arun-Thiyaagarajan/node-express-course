import { Router } from 'express';
import { register, login, logout, verifyEmail } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/verify-email', verifyEmail);

export default router;
