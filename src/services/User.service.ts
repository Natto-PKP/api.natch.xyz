import { Op } from 'sequelize';
import PaginationService from '../utils/Pagination.util';
import type Types from '../../typings';
import { UserModel } from '../models';

export default class UserService {
  static async create(body: Types.UserRegisterBody) {
    await UserModel.create(body);
  }

  static async delete(userId: string) {
    await UserModel.destroy({ where: { id: userId } });
  }

  static async update(userId: string, body: Types.UserUpdateData) {
    await UserModel.update(body, { where: { id: userId } });
  }

  static async getById<T extends Types.UserReturningType>(userId: string, returning: T) {
    let attributes;
    if (returning === 'personal') attributes = { exclude: ['password'] };
    if (returning === 'public') attributes = { exclude: ['password', 'email'] };

    const user = await UserModel.findByPk(userId, { attributes });
    return user as Types.UserReturningInterface<T> | null;
  }

  static async getByEmail<T extends Types.UserReturningType>(email: string, returning: T) {
    let attributes;
    if (returning === 'personal') attributes = { exclude: ['password'] };
    if (returning === 'public') attributes = { exclude: ['password', 'email'] };

    const user = await UserModel.findOne({
      where: { email: email.toLowerCase() },
      attributes,
    });
    return user as Types.UserReturningInterface<T> | null;
  }

  static async getByUsername<T extends Types.UserReturningType>(username: string, returning: T) {
    let attributes;
    if (returning === 'personal') attributes = { exclude: ['password'] };
    if (returning === 'public') attributes = { exclude: ['password', 'email'] };

    const user = await UserModel.findOne({
      where: { username },
      attributes,
    });
    return user as Types.UserReturningInterface<T> | null;
  }

  static async search<T extends Types.UserReturningType>(
    query: Types.UserSearchQuery,
    returning: T,
  ) {
    const limit = PaginationService.getLimit(query.limit);
    const page = PaginationService.getPage(query.page);
    const offset = PaginationService.calcOffset(page, limit);

    let attributes;
    if (returning === 'personal') attributes = { exclude: ['password'] };
    if (returning === 'public') attributes = { exclude: ['password', 'email'] };

    const where = { } as any;
    if (query.pseudo) where.pseudo = { [Op.iLike]: `%${query.pseudo}%` };
    if (query.username) where.username = { [Op.iLike]: `%${query.username}%` };

    return UserModel.findAll({
      where,
      limit,
      offset,
      attributes,
    }) as Promise<Types.UserPublicInterface[]>;
  }
}
