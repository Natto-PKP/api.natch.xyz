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
import { TeamModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export interface ITeamRole extends ICore {
  id: string;
  name: string;
  description?: string | null;
  isPrivate: boolean;
  permissions: bigint;
  order: number;
  category?: string | null;
  color?: string | null;
  isAutoAttributable: boolean;
  isManaged: boolean;
  newMemberRole: boolean;
  teamId: string;
}

@Table({ tableName: 'team_role' })
export class TeamRoleModel extends CoreModel implements ITeamRole {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT })
  declare name: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isPrivate: boolean;

  @AllowNull(false)
  @Default(0n)
  @Column({ type: DataType.BIGINT })
  declare permissions: bigint;

  @AllowNull(false)
  @Default(0)
  @Column({ type: DataType.INTEGER })
  declare order: number;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare category?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare color?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isAutoAttributable: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isManaged: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare newMemberRole: boolean;

  @AllowNull(false)
  @ForeignKey(() => TeamModel)
  @Column({ type: DataType.TEXT })
  declare teamId: string;

  @BelongsTo(() => TeamModel, { foreignKey: 'team_id', onDelete: 'CASCADE' })
  declare team: TeamModel;
}
