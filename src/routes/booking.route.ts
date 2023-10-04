import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';

const bookingRouter: Router = express.Router();

const authInstance = new AuthMiddleware();

// creactig booking
bookingRouter.post('/create', authInstance.isAuthenticated);

// get all booking for an user
bookingRouter.get('/read', authInstance.isAuthenticated);
// delet a booking
bookingRouter.delete('/:bid', authInstance.isAuthenticated);
// get all booking
bookingRouter.get('/', authInstance.isAuthenticated, authInstance.isAdmin);

export default bookingRouter;
