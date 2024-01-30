import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { UserModel, RelatedAccountModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IUserHasRelatedAccountSettings {}

export interface IUserHasRelatedAccount extends ICore {
  userId: string;
  relatedAccountId: string;
  description?: string | null;
  settings: IUserHasRelatedAccountSettings;
  visibility: 'public' | 'private';
}

export const DEFAULT_USER_HAS_RELATED_ACCOUNT_SETTINGS: IUserHasRelatedAccountSettings = {};

@Table({ tableName: 'user_has_related_account' })
export class UserHasRelatedAccountModel extends CoreModel implements IUserHasRelatedAccount {
  @ForeignKey(() => UserModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare userId: string;

  @ForeignKey(() => RelatedAccountModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare relatedAccountId: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description?: string | null;

  @AllowNull(false)
  @Default(DEFAULT_USER_HAS_RELATED_ACCOUNT_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: IUserHasRelatedAccountSettings;

  @AllowNull(false)
  @Default('public')
  @Column({ type: DataType.TEXT })
  declare visibility: IUserHasRelatedAccount['visibility'];

  @BelongsTo(() => UserModel, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  declare user: UserModel;

  @BelongsTo(() => RelatedAccountModel, { foreignKey: 'related_account_id', onDelete: 'CASCADE' })
  declare relatedAccount: RelatedAccountModel;
}
