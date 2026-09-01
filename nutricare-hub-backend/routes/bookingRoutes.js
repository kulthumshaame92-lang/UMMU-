import express from 'express';
import {
  getBookings,
  createBooking,
  getBookingById,
  updateBookingStatus
} from '../controllers/bookingController.js';
import { validateBody } from '../middleware/validator.js';

const router = express.Router();

router.get('/', getBookings);
router.get('/:id', getBookingById);
router.post('/', validateBody(['nutritionistId', 'tierId', 'clientName']), createBooking);
router.patch('/:id/status', updateBookingStatus);

export default router;
