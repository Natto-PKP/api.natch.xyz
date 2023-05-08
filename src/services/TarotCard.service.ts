import { Op } from 'sequelize';
import PaginationService from '../utils/Pagination.util';
import type Types from '../../typings';
import { TarotCardModel } from '../models';

export default class TarotCardService {
  static async create(body: Types.TarotCardCreateBody) {
    await TarotCardModel.create(body);
  }

  static async delete(tarotCardId: string) {
    await TarotCardModel.destroy({ where: { id: tarotCardId } });
  }

  static async update(tarotCardId: string, body: Types.TarotCardUpdateBody) {
    await TarotCardModel.update(body, { where: { id: tarotCardId } });
  }

  static async getById(tarotCardId: string) {
    return TarotCardModel.findByPk(tarotCardId);
  }

  static async getByIdentifier(identifier: string) {
    return TarotCardModel.findOne({ where: { identifier } });
  }

  static async search(query: Types.TarotCardSearchQuery) {
    const limit = PaginationService.getLimit(query.limit ? Number(query.limit) : undefined);
    const page = PaginationService.getPage(query.page ? Number(query.page) : undefined);
    const offset = PaginationService.calcOffset(page, limit);

    const where = { } as any;
    if (query.name) where.name = { [Op.iLike]: `%${query.name}%` };

    return TarotCardModel.findAll({
      where,
      limit,
      offset,
    });
  }
}
