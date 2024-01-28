import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { ProfileModel, UserRelatedAccountModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IProfileHasUserRelatedAccount extends ICore {
  profileId: string;
  userRelatedAccountId: string;
}

@Table({ tableName: 'profile_has_user_related_account' })
export class ProfileHasUserRelatedAccountModel extends CoreModel implements IProfileHasUserRelatedAccount {
  @ForeignKey(() => ProfileModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare profileId: string;

  @ForeignKey(() => UserRelatedAccountModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare userRelatedAccountId: string;

  @BelongsTo(() => ProfileModel, { foreignKey: 'profile_id', onDelete: 'CASCADE' })
  declare profile: ProfileModel;

  @BelongsTo(() => UserRelatedAccountModel, { foreignKey: 'user_related_account_id', onDelete: 'CASCADE' })
  declare userRelatedAccount: UserRelatedAccountModel;
}
