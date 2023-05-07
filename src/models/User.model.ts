/* eslint-disable no-bitwise */
import {
  Table,
  Column,
  DataType,
  Unique,
  Default,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { CoreModel } from './Core.model';
import { UserRoleType } from '../enums/UserRoles.enum';
import type { UserPermissionType } from '../enums/UserPermissions.enum';
import UserRoleManager from '../managers/UserRoles.manager';
import UserPermissionManager from '../managers/UserPermission.manager';
import CheckUtil from '../utils/Check.util';
import { TarotCardModel } from './TarotCard.model';
import { UserTarotCardModel } from './UserTarotCard.model';
import { UserInterface } from '../../typings';

@Table({ tableName: 'user' })
export class UserModel extends CoreModel implements UserInterface {
  @AllowNull(false)
  @Column({ type: DataType.TEXT, validate: { is: CheckUtil.USER_PSEUDO } })
  declare pseudo: string;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.TEXT, validate: { is: CheckUtil.USER_USERNAME } })
  declare username: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
    validate: { isEmail: true },
    set(this: UserModel, value: string) { this.setDataValue('email', value.toLowerCase()); },
  })
  declare email: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare password: string;

  @AllowNull(false)
  @Default(() => 1)
  @Column({ type: DataType.INTEGER, validate: { min: 1 } })
  declare level: number;

  @AllowNull(false)
  @Default(() => 0)
  @Column({ type: DataType.INTEGER, validate: { min: 0 } })
  declare points: number;

  @AllowNull(false)
  @Default(() => UserRoleManager.merge(['BASIC_USER']))
  @Column({
    type: DataType.BIGINT,
    get(this: UserModel) {
      const value = this.getDataValue('roles') as bigint;
      return UserRoleManager.resolve(BigInt(value));
    },
    set(this: UserModel, keys: UserRoleType[]) {
      const value = UserRoleManager.merge(keys);
      this.setDataValue('roles', value);
    },
  })
  declare roles: UserRoleType[];

  @AllowNull(false)
  @Default(() => UserPermissionManager.merge(UserRoleManager.permissions.BASIC_USER))
  @Column({
    type: DataType.BIGINT,
    get(this: UserModel) {
      const value = this.getDataValue('permissions') as bigint;
      return UserPermissionManager.resolve(BigInt(value));
    },
    set(this: UserModel, keys: UserPermissionType[]) {
      const value = UserPermissionManager.merge(keys);
      this.setDataValue('permissions', value);
    },
  })
  declare permissions: UserPermissionType[];

  @BelongsToMany(() => TarotCardModel, () => UserTarotCardModel, 'userId')
  declare tarotCards: TarotCardModel[];
}
