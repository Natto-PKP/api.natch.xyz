import type { Request, Response } from 'express';

import APIError from '../errors/APIError';
import CompanyService from '../services/Company.service';
import EmployeeService from '../services/Employee.service';

export default {
  createOne: async (req: Request, res: Response) => {
    const { body } = req;

    const companyId = await CompanyService.createOne(body);
    res.status(201).json({ id: companyId });
  },

  deleteOne: async (req: Request, res: Response) => {
    const { companyId } = req.params;

    await CompanyService.deleteOne(companyId);
    res.status(204).json(null);
  },

  updateOne: async (req: Request, res: Response) => {
    const { body } = req;
    const { companyId } = req.params;

    await CompanyService.updateOne(companyId, body);
    res.status(200).json(null);
  },

  getOne: async (req: Request, res: Response) => {
    const { companyId } = req.params;

    const company = await CompanyService.getOne(companyId);
    res.status(200).json(company);
  },

  getAll: async (req: Request, res: Response) => {
    const { query } = req;

    const companies = await CompanyService.getAll(query);

    res.status(200).json(companies);
  },

  getAllEmployees: async (req: Request, res: Response) => {
    const { companyId } = req.params;
    const { query } = req;

    const company = await CompanyService.getOne(companyId);
    if (!company) throw new APIError('company not found', 404);

    const employees = await EmployeeService.getAll({ ...query, companyId });
    res.status(200).json(employees);
  },

  getOneEmployee: async (req: Request, res: Response) => {
    const { companyId, employeeId } = req.params;

    const company = await CompanyService.getOne(companyId);
    if (!company) throw new APIError('company not found', 404);

    const employee = await EmployeeService.getOne(employeeId, companyId);
    res.status(200).json(employee);
  },
};
