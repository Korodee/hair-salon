import { Router } from 'express';
import { BookingController } from '../controllers/bookingController';
import { auth } from '../middlewares/auth';

const router = Router();

// All routes require authentication
router.use(auth);

// User routes
router.post('/', BookingController.createBooking);
router.get('/user', BookingController.getUserBookings);
router.get('/:id', BookingController.getBookingById);
router.patch('/:id/status', BookingController.updateBookingStatus);
router.patch('/:id/payment', BookingController.updatePaymentStatus);

export default router; 