import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/auth.js';
import { validateBody } from '../middleware/validator.js';

const router = express.Router();

router.post('/register', validateBody(['name', 'email', 'password']), register);
router.post('/login', validateBody(['email', 'password']), login);
router.get('/me', authenticateJWT, getMe);
router.put('/profile', authenticateJWT, updateProfile);

export default router;
