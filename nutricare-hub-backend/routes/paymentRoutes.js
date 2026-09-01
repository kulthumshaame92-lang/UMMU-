import express from 'express';
import { processCheckout, getPaymentHistory, getPaymentById } from '../controllers/paymentController.js';
import { validateBody } from '../middleware/validator.js';

const router = express.Router();

router.post('/checkout', validateBody(['amount', 'description']), processCheckout);
router.get('/history', getPaymentHistory);
router.get('/:id', getPaymentById);

export default router;
