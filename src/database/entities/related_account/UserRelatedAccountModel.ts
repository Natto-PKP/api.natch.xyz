import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { UserModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export type UserRelatedAccountType = 'discord';

export interface IUserRelatedAccount extends ICore {
  id: string;
  name: string;
  type: UserRelatedAccountType;
  url?: string | null;
  relatedAccountId?: string | null;
  relatedAccountSecret?: string | null;
  relatedAccountToken?: string | null;
  isNsfw: boolean;
  userId: string;
}

@Table({ tableName: 'user_related_account' })
export class UserRelatedAccountModel extends CoreModel implements IUserRelatedAccount {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT })
  declare name: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare type: UserRelatedAccountType;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare url?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare relatedAccountId?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare relatedAccountSecret?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare relatedAccountToken?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isNsfw: boolean;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.TEXT })
  declare userId: string;

  @BelongsTo(() => UserModel, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  declare user: UserModel;
}
