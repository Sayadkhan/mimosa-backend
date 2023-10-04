import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const userRouter: Router = express.Router();

const authInstnce = new AuthMiddleware();
const userInstance = new UserController();

// get an user
userRouter.get('/:uid', authInstnce.isAuthenticated, userInstance.getAnUser);
// delet an user
userRouter.delete(
  '/:uid',
  authInstnce.isAuthenticated,
  userInstance.deletAnUser
);

// update an user
userRouter.put('/:uid', authInstnce.isAuthenticated, userInstance.updateAnUser);

// get all user
userRouter.get(
  '/',
  authInstnce.isAuthenticated,
  authInstnce.isAdmin,
  userInstance.getallUser
);

export default userRouter;
