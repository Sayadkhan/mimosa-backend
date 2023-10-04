import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import BeautyPackageController from '../controllers/beautyPackage.controller';

const beautyPackageRouter: Router = express.Router();

const authInstance = new AuthMiddleware();

const beautyPackageInstance = new BeautyPackageController();

// get all beautypackages
beautyPackageRouter.get('/', beautyPackageInstance.getAllPackages);
// get a beauty package
beautyPackageRouter.get('/:bid', beautyPackageInstance.getABeautypackage);
// creat a beauty package
beautyPackageRouter.post(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  beautyPackageInstance.createABeautyPackage
);
// update a beauty package
beautyPackageRouter.put(
  '/:bid',
  authInstance.isAuthenticated,
  authInstance.isAdmin
);

// delet a beauty package
beautyPackageRouter.delete(
  ':/bid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  beautyPackageInstance.deletABeautypackage
);

export default beautyPackageRouter;
