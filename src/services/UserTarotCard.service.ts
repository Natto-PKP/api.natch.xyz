import PaginationService from '../utils/Pagination.util';
import type { TarotCardSearchQuery, UserTarotCardCreateBody } from '../../typings';
import { TarotCardModel, UserModel, UserTarotCardModel } from '../models';

export default class UserTarotCardService {
  static async create(userId: string, tarotCardId: string, body: UserTarotCardCreateBody) {
    await UserTarotCardModel.create({ ...body, userId, tarotCardId });
  }

  static async delete(userId: string, tarotCardId: string) {
    await UserTarotCardModel.destroy({ where: { tarotCardId, userId } });
  }

  static async get(userId: string, tarotCardId: string) {
    return UserTarotCardModel.findOne({ where: { userId, tarotCardId } });
  }

  static async getAll(userId: string, query: TarotCardSearchQuery) {
    const limit = PaginationService.getLimit(query.limit ? Number(query.limit) : undefined);
    const page = PaginationService.getPage(query.page ? Number(query.page) : undefined);
    const offset = PaginationService.calcOffset(page, limit);

    const tarotCards = await UserTarotCardModel.findAll({
      attributes: [['created_at', 'obtainerAt']],
      include: [
        { model: TarotCardModel, as: 'tarotCard' },
        { model: UserModel, as: 'givenBy', attributes: ['id', 'username', 'pseudo'] },
      ],
      where: { userId },
      limit,
      offset,
    });

    return tarotCards;
  }
}
