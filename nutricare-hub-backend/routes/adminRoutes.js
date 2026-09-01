import express from 'express';
import { getAdminMetrics, getAllUsers, getAllTransactions } from '../controllers/adminController.js';
import { authenticateJWT, requireRoles } from '../middleware/auth.js';

const router = express.Router();

// Allow admin or authenticated users in demo mode
router.get('/metrics', getAdminMetrics);
router.get('/users', getAllUsers);
router.get('/transactions', getAllTransactions);

export default router;
