import express, { Router } from 'express';

const userRouter: Router = express.Router();

// get all user
userRouter.get('/');

// get an user
userRouter.get('/:userid');
// delet an user
userRouter.delete('/:userid');

// update an user
userRouter.put('/:userid');

export default userRouter;
