import express, { Router } from 'express';

const authRouter: Router = express.Router();

// register
authRouter.post('/regiter');

// login
authRouter.post('/login');

export default authRouter;
