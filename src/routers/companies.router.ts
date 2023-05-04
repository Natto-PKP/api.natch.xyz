import { Router } from 'express';
import controller from '../controllers/companies.controller';
import handler from '../helpers/async.helper';
import { schemas as companySchemas } from '../schemas/companies.schema';
import { schemas as employeeSchemas } from '../schemas/employees.schema';
import RegexpUtil from '../utils/Regexp.util';
import validate from '../middlewares/validate';

const router = Router();

// ! PENSER A AJOUTER LES SCHEMAS ET AUTH ET LA DOC SWAGGER

// ? GET ALL COMPANIES
const getAllQueryValidate = validate(companySchemas.query.getAll, 'query');
const getAllController = handler(controller.getAll);
router.get('/', getAllQueryValidate, getAllController);

// ? GET A COMPANY
const getOneController = handler(controller.getOne);
router.get(`/:companyId(${RegexpUtil.UUID})`, getOneController);

// ? GET ALL COMPANY EMPLOYEES
const getAllEmployeesQueryValidate = validate(employeeSchemas.query.getAll, 'query');
const getAllEmployeesController = handler(controller.getAllEmployees);
router.get(`/:companyId(${RegexpUtil.UUID})/employees`, getAllEmployeesQueryValidate, getAllEmployeesController);

// ? GET A COMPANY EMPLOYEE
const getEmployeeController = handler(controller.getOneEmployee);
router.get(`/:companyId(${RegexpUtil.UUID})/employees/:employee(${RegexpUtil.UUID})`, getEmployeeController);

// ? CREATE COMPANY
const createBodyValidate = validate(companySchemas.body.createOne, 'body');
const createController = handler(controller.createOne);
router.post(`/:companyId(${RegexpUtil.UUID})`, createBodyValidate, createController);

// ? UPDATE COMPANY
const updateBodyValidate = validate(companySchemas.body.updateOne, 'body');
const updateController = handler(controller.updateOne);
router.patch(`/:companyId(${RegexpUtil.UUID})`, updateBodyValidate, updateController);

// ? DELETE COMPANY
const deleteController = handler(controller.deleteOne);
router.delete(`/:companyId(${RegexpUtil.UUID})`, deleteController);

export default router;
