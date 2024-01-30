import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { ProfileModel, RelatedAccountModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IProfileHasRelatedAccount extends ICore {
  profileId: string;
  relatedAccountId: string;
}

@Table({ tableName: 'profile_has_related_account' })
export class ProfileHasRelatedAccountModel extends CoreModel implements IProfileHasRelatedAccount {
  @ForeignKey(() => ProfileModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare profileId: string;

  @ForeignKey(() => RelatedAccountModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare relatedAccountId: string;

  @BelongsTo(() => ProfileModel, { foreignKey: 'profile_id', onDelete: 'CASCADE' })
  declare profile: ProfileModel;

  @BelongsTo(() => RelatedAccountModel, { foreignKey: 'related_account_id', onDelete: 'CASCADE' })
  declare relatedAccount: RelatedAccountModel;
}
