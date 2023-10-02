import express, { Router } from 'express';

const beautyPackageRouter: Router = express.Router();

// get all beautypackages
beautyPackageRouter.get('/');
// get a beauty package
beautyPackageRouter.get(':beautypackageid');
// creat a beauty package
beautyPackageRouter.post('/');
// update a beauty package
beautyPackageRouter.put(':beautypackageid');

export default beautyPackageRouter;
