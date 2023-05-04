import type { Request, Response } from 'express';

import EmployeeService from '../services/Employee.service';

export default {
  createOne: async (req: Request, res: Response) => {
    const { body } = req;

    const employeeId = await EmployeeService.createOne(body);
    res.status(201).json({ id: employeeId });
  },

  deleteOne: async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    await EmployeeService.deleteOne(employeeId);
    res.status(204).json(null);
  },

  updateOne: async (req: Request, res: Response) => {
    const { body } = req;
    const { employeeId } = req.params;

    await EmployeeService.updateOne(employeeId, body);
    res.status(200).json(null);
  },

  getOne: async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    const company = await EmployeeService.getOne(employeeId);
    res.status(200).json(company);
  },

  getAll: async (req: Request, res: Response) => {
    const { query } = req;

    const companies = await EmployeeService.getAll(query);

    res.status(200).json(companies);
  },
};
