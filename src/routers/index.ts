import { Router } from 'express';

import APIError from '../errors/APIError';
import errorHandler from '../helpers/error.helper';

import companiesRouter from './companies.router';
import employeesRouter from './employees.router';

const router = Router();

router.use('/companies', companiesRouter);
router.use('/employees', employeesRouter);
router.use(() => { throw new APIError('page not found', 404); });
router.use(errorHandler);

export default router;
