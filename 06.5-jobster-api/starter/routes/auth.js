import { Router } from 'express';
import { login, register, updateUser } from '../controllers/auth.js'
import authenticateUser from '../middleware/authentication.js';
import testUser from '../middleware/testUser.js';

const router = new Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/updateUser', authenticateUser, testUser, updateUser);

export default router;
