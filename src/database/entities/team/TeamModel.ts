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
import { UserModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export type TeamType = 'community' | 'organization' | 'other';

export interface ITeamSettings {}

export interface ITeam extends ICore {
  id: string;
  identifier: string;
  type: TeamType;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  cagegories: bigint;
  languages: bigint;
  tags: bigint;
  userCanJoin: boolean;
  icon?: string | null;
  banner?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  settings: ITeamSettings;
  ownerId?: string | null;
}

export const DEFAULT_TEAM_SETTINGS: ITeamSettings = {};

@Table({ tableName: 'team' })
export class TeamModel extends CoreModel implements ITeam {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT })
  declare identifier: string;

  @AllowNull(false)
  @Default('community')
  @Column({ type: DataType.TEXT })
  declare type: TeamType;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare name: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare shortDescription?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description?: string | null;

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.BIGINT })
  declare cagegories: bigint;

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.BIGINT })
  declare languages: bigint;

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.BIGINT })
  declare tags: bigint;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare userCanJoin: boolean;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare icon?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare banner?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare primaryColor?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare secondaryColor?: string | null;

  @AllowNull(false)
  @Default(DEFAULT_TEAM_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: ITeamSettings;

  @AllowNull(true)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.TEXT })
  declare ownerId?: string | null;

  @BelongsTo(() => UserModel, { foreignKey: 'owner_id', onDelete: 'CASCADE' })
  declare owner?: UserModel | null;
}
