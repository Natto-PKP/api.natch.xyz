import { Op } from 'sequelize';
import { CompanyModel } from '../models';
import type { CompaniesQueryGetAllInterface, CompanyModelCreateBodyType, CompanyModelUpdateBodyType } from '../schemas/companies.schema';
import PaginationService from '../utils/Pagination.util';

export default class CompanyService {
  static async createOne(body: CompanyModelCreateBodyType) {
    const { id } = await CompanyModel.create(body);
    return id;
  }

  static async deleteOne(companyId: string) {
    await CompanyModel.destroy({ where: { id: companyId } });
  }

  static async updateOne(companyId: string, body: CompanyModelUpdateBodyType) {
    await CompanyModel.update(body, { where: { id: companyId } });
  }

  static async getOne(companyId: string) {
    return CompanyModel.findByPk(companyId, { raw: true });
  }

  static async getAll(query: CompaniesQueryGetAllInterface) {
    const limit = PaginationService.getLimit(query.limit);
    const page = PaginationService.getPage(query.page);
    const offset = PaginationService.calcOffset(page, limit);

    const where = {
      country: query.country || undefined,
      name: query.search ? { [Op.like]: `%${query.search}%` } : undefined,
    };

    return CompanyModel.findAll({
      where,
      limit,
      offset,
      raw: true,
    });
  }
}
