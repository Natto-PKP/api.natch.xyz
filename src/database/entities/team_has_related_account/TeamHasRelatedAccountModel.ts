import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { TeamModel, RelatedAccountModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export interface ITeamHasRelatedAccountSettings {}

export interface ITeamHasRelatedAccount extends ICore {
  teamId: string;
  relatedAccountId: string;
  description?: string | null;
  settings: ITeamHasRelatedAccountSettings;
  visibility: 'public' | 'private';
}

export const DEFAULT_TEAM_HAS_RELATED_ACCOUNT_SETTINGS: ITeamHasRelatedAccountSettings = {};

@Table({ tableName: 'team_has_related_account' })
export class TeamHasRelatedAccountModel extends CoreModel implements ITeamHasRelatedAccount {
  @ForeignKey(() => TeamModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare teamId: string;

  @ForeignKey(() => RelatedAccountModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare relatedAccountId: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description?: string | null;

  @AllowNull(false)
  @Default(DEFAULT_TEAM_HAS_RELATED_ACCOUNT_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: ITeamHasRelatedAccountSettings;

  @AllowNull(false)
  @Default('public')
  @Column({ type: DataType.TEXT })
  declare visibility: ITeamHasRelatedAccount['visibility'];

  @BelongsTo(() => TeamModel, { foreignKey: 'team_id', onDelete: 'CASCADE' })
  declare team: TeamModel;

  @BelongsTo(() => RelatedAccountModel, { foreignKey: 'related_account_id', onDelete: 'CASCADE' })
  declare relatedAccount: RelatedAccountModel;
}
