import { EmployeeModel } from '../models';
import PaginationService from '../utils/Pagination.util';
import type { EmployeeModelCreateBodyType, EmployeeModelUpdateBodyType, EmployeesQueryGetAllInterface } from '../schemas/employees.schema';

export default class EmployeeService {
  static async createOne(body: EmployeeModelCreateBodyType) {
    const { id } = await EmployeeModel.create(body);
    return id;
  }

  static async deleteOne(employeeId: string) {
    await EmployeeModel.destroy({ where: { id: employeeId } });
  }

  static async updateOne(employeeId: string, body: EmployeeModelUpdateBodyType) {
    await EmployeeModel.update(body, { where: { id: employeeId } });
  }

  static async getOne(employeeId: string, companyId?: string) {
    if (companyId) {
      const where = { id: employeeId, companyId };
      return EmployeeModel.findOne({ where, raw: true });
    } return EmployeeModel.findByPk(employeeId, { raw: true });
  }

  static async getAll(query: EmployeesQueryGetAllInterface) {
    const limit = PaginationService.getLimit(query.limit);
    const page = PaginationService.getPage(query.page);
    const offset = PaginationService.calcOffset(page, limit);

    const where = {
      companyId: query.companyId || undefined,
    };

    return EmployeeModel.findAll({
      where,
      limit,
      offset,
      raw: true,
    });
  }
}
