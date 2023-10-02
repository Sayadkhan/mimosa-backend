import express, { Router } from 'express';

const specialistRouter: Router = express.Router();

// get all specialist
specialistRouter.get('/');
// get a specialist
specialistRouter.get('/:sid');
// creat a specialist
specialistRouter.post('/');
// update a specialist
specialistRouter.put('/:sid');
// delet a specialist
specialistRouter.delete(':/sid');

export default specialistRouter;
