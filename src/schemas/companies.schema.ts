import Joi from 'joi';
import { CompanyCategories, CompanyModelDataInterface } from '../models';

export type CompanyModelCreateBodyType = Omit<CompanyModelDataInterface, 'code'>;
export type CompanyModelUpdateBodyType = Partial<CompanyModelCreateBodyType>;
export interface CompaniesQueryGetAllInterface {
  search?: string;
  country?: string;
  limit?: number;
  page?: number;
}

const categoriesNames = Object.keys(CompanyCategories);
const categories = Joi.array().items(Joi.string().pattern(RegExp(`^${categoriesNames.join('|')}$`)));

export const schemas = {
  body: {
    createOne: Joi.object({
      name: Joi.string().required(),
      slogan: Joi.string(),
      country: Joi.string(),
      postalCode: Joi.string(),
      street: Joi.string(),
      categories,
    }).required(),

    updateOne: Joi.object({
      name: Joi.string(),
      slogan: Joi.string(),
      country: Joi.string(),
      postalCode: Joi.string(),
      street: Joi.string(),
      categories,
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
