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
import { TeamModel, MemberModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export interface ITeamInviteSettings {}

export interface ITeamInvite extends ICore {
  id: string;
  teamId: string;
  memberId: string;
  label?: string | null;
  code: string;
  maxUses?: number | null;
  uses: number;
  expiresAt?: Date | null;
  settings: ITeamInviteSettings;
}

const DEFAULT_TEAM_INVITE_SETTINGS: ITeamInviteSettings = {};

@Table({ tableName: 'team_invite' })
export class TeamInviteModel extends CoreModel implements ITeamInvite {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @ForeignKey(() => TeamModel)
  @Column({ type: DataType.TEXT })
  declare teamId: string;

  @AllowNull(false)
  @ForeignKey(() => MemberModel)
  @Column({ type: DataType.TEXT })
  declare memberId: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare label?: string | null;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT })
  declare code: string;

  @AllowNull(true)
  @Column({ type: DataType.INTEGER })
  declare maxUses?: number | null;

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.INTEGER })
  declare uses: number;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  declare expiresAt?: Date | null;

  @AllowNull(false)
  @Default(DEFAULT_TEAM_INVITE_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: ITeamInviteSettings;

  @BelongsTo(() => MemberModel, { foreignKey: 'member_id', onDelete: 'CASCADE' })
  declare member: MemberModel;

  @BelongsTo(() => TeamModel, { foreignKey: 'team_id', onDelete: 'CASCADE' })
  declare team: TeamModel;
}
