import Joi from 'joi';

export const MIN_LIMIT = 0;
export const MAX_LIMIT = 200;
export const DEFAULT_LIMIT = 100;

export type IPagination = { offset: number; limit: number; page: number };

export const PaginationSchemaData = {
  limit: Joi.number().integer().positive(),
  page: Joi.alternatives().conditional('offset', {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.number().integer().positive(),
  }),
  offset: Joi.alternatives().conditional('page', {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.number().integer().positive(),
  }),
};

export class Pagination {
  static getLimit(limit = DEFAULT_LIMIT, min = MIN_LIMIT, max = MAX_LIMIT) {
    if (limit < min) return min;
    if (limit > max) return max;
    return limit;
  }

  static getPage(page = 0) {
    return page < 0 ? 0 : page;
  }

  static getOffset(offset = 0) {
    return offset < 0 ? 0 : offset;
  }

  static calcOffset(page: number, limit: number) {
    const l = Pagination.getLimit(limit);
    const p = Pagination.getPage(page);
    return p * l;
  }

  static calcPage(offset: number, limit: number) {
    const l = Pagination.getLimit(limit);
    const o = Pagination.getOffset(offset);
    return Math.floor(o / l);
  }

  static from(pagination?: Partial<IPagination>): IPagination {
    if (pagination) {
      if (pagination.page) {
        const page = Pagination.getPage(pagination.page);
        const limit = Pagination.getLimit(pagination.limit);
        const offset = Pagination.calcOffset(page, limit);
        return { offset, limit, page };
      }

      if (pagination.offset) {
        const offset = Pagination.getOffset(pagination.offset);
        const limit = Pagination.getLimit(pagination.limit);
        const page = Pagination.calcPage(offset, limit);
        return { offset, limit, page };
      }

      const limit = Pagination.getLimit(pagination.limit);
      return { offset: 0, limit, page: 0 };
    }

    return { offset: 0, limit: DEFAULT_LIMIT, page: 0 };
  }
}
