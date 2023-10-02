import express, { Router } from 'express';

const bookingRouter: Router = express.Router();

// creactig booking
bookingRouter.post('/create');

// get all booking
bookingRouter.get('/');
// get all booking for an user
bookingRouter.get('/read');
// delet a booking
bookingRouter.delete('/:bookingid');

export default bookingRouter;
