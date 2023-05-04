import { Router } from 'express';
import controller from '../controllers/companies.controller';
import handler from '../helpers/async.helper';
import { schemas as employeeSchemas } from '../schemas/employees.schema';
import RegexpUtil from '../utils/Regexp.util';
import validate from '../middlewares/validate';

const router = Router();

// ! PENSER A AJOUTER LES SCHEMAS ET AUTH ET LA DOC SWAGGER

// ? GET ALL EMPLOYEES
const getAllQueryValidate = validate(employeeSchemas.query.getAll, 'query');
const getAllController = handler(controller.getAll);
router.get('/', getAllQueryValidate, getAllController);

// ? GET A EMPLOYEE
const getOneController = handler(controller.getOne);
router.get(`/:employeeId(${RegexpUtil.UUID})`, getOneController);

// ? CREATE EMPLOYEE
const createBodyValidate = validate(employeeSchemas.body.createOne, 'body');
const createController = handler(controller.createOne);
router.post(`/:employeeId(${RegexpUtil.UUID})`, createBodyValidate, createController);

// ? UPDATE EMPLOYEE
const updateBodyValidate = validate(employeeSchemas.body.updateOne, 'body');
const updateController = handler(controller.updateOne);
router.patch(`/:employeeId(${RegexpUtil.UUID})`, updateBodyValidate, updateController);

// ? DELETE EMPLOYEE
const deleteController = handler(controller.deleteOne);
router.delete(`/:employeeId(${RegexpUtil.UUID})`, deleteController);

export default router;
