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
import { CommunityModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export interface ICommunityRole extends ICore {
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
  communityId: string;
}

@Table({ tableName: 'community_role' })
export class CommunityRoleModel extends CoreModel implements ICommunityRole {
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
  @ForeignKey(() => CommunityModel)
  @Column({ type: DataType.TEXT })
  declare communityId: string;

  @BelongsTo(() => CommunityModel, { foreignKey: 'community_id', onDelete: 'CASCADE' })
  declare community: CommunityModel;
}
