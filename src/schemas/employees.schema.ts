import Joi from 'joi';
import type { EmployeeModelDataInterface } from '../models';

export type EmployeeModelCreateBodyType = Omit<EmployeeModelDataInterface, 'code'>;
export type EmployeeModelUpdateBodyType = Partial<EmployeeModelCreateBodyType>;
export interface EmployeesQueryGetAllInterface {
  companyId?: string;
  limit?: number;
  page?: number;
}

export const schemas = {
  body: {
    createOne: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      companyId: Joi.string().uuid(),
    }).required(),

    updateOne: Joi.object({
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      companyId: Joi.string().uuid(),
    }).required(),
  },

  query: {
    getAll: Joi.object({
      search: Joi.string(),
      country: Joi.string(),
      limit: Joi.number(),
    }),
  },
};
