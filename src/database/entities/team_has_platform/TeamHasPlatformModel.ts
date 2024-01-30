import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { TeamModel, PlatformModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export interface ITeamHasPlatformSettings {}

export interface ITeamHasPlatform extends ICore {
  teamId: string;
  platformId: string;
  description?: string | null;
  settings: ITeamHasPlatformSettings;
  visibility: 'public' | 'private';
}

export const DEFAULT_TEAM_HAS_PLATFORM_SETTINGS: ITeamHasPlatformSettings = {};

@Table({ tableName: 'team_has_platform' })
export class TeamHasPlatformModel extends CoreModel implements ITeamHasPlatform {
  @ForeignKey(() => TeamModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare teamId: string;

  @ForeignKey(() => PlatformModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare platformId: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description?: string | null;

  @AllowNull(false)
  @Default(DEFAULT_TEAM_HAS_PLATFORM_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: ITeamHasPlatformSettings;

  @AllowNull(false)
  @Default('public')
  @Column({ type: DataType.TEXT })
  declare visibility: ITeamHasPlatform['visibility'];

  @BelongsTo(() => TeamModel, { foreignKey: 'team_id', onDelete: 'CASCADE' })
  declare team: TeamModel;

  @BelongsTo(() => PlatformModel, { foreignKey: 'platform_id', onDelete: 'CASCADE' })
  declare platform: PlatformModel;
}
