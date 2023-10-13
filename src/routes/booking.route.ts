import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import BookingController from '../controllers/booking.controller';

const bookingRouter: Router = express.Router();

const authInstance = new AuthMiddleware();
const bookingInstance = new BookingController();

// creactig booking
bookingRouter.post(
  '/create/:bid',
  authInstance.isAuthenticated,
  bookingInstance.createABooking
);

// delet a booking
bookingRouter.delete(
  '/:bid',
  authInstance.isAuthenticated,
  bookingInstance.deleteABooking
);
// get all booking
bookingRouter.get(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  bookingInstance.getAllBookings
);

export default bookingRouter;
