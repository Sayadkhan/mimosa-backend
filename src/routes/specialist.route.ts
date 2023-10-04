import { specialistType } from './../types/specialist.type';
import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import SpecialistController from '../controllers/specialist.controller';

const specialistRouter: Router = express.Router();

const authInstance = new AuthMiddleware();

const specialistInstance = new SpecialistController();

// get all specialist
specialistRouter.get('/', specialistInstance.getAllSpecialists);
// get a specialist
specialistRouter.get('/:sid', specialistInstance.getASpecialist);
// creat a specialist
specialistRouter.post(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  specialistInstance.createASpecialist
);
// update a specialist
specialistRouter.put(
  '/:sid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  specialistInstance.upadteASpecialist
);
// delet a specialist
specialistRouter.delete(
  ':/sid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  specialistInstance.deletASpecialist
);

export default specialistRouter;
