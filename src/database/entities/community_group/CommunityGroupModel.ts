import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { UserModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export type CommunityGroupType = 'discord';

export interface ICommunityGroupSettings {}

export interface ICommunityGroup extends ICore {
  id: string;
  identifier: string;
  name: string;
  description?: string | null;
  type: CommunityGroupType;
  isExternal: boolean;
  url?: string | null;
  externalId?: string | null;
  isPrivate: boolean;
  isNsfw: boolean;
  isVerified: boolean;
  isManaged: boolean;
  icon?: string | null;
  color?: string | null;
  settings: ICommunityGroupSettings;
  communityId: string;
}

export const DEFAULT_COMMUNITY_GROUP_SETTINGS: ICommunityGroupSettings = {};

@Table({ tableName: 'community_group' })
export class CommunityGroupModel extends CoreModel implements ICommunityGroup {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare identifier: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare name: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description?: string | null;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare type: CommunityGroupType;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isExternal: boolean;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare url?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare externalId?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isPrivate: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isNsfw: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isVerified: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isManaged: boolean;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare icon?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare color?: string | null;

  @AllowNull(false)
  @Default(DEFAULT_COMMUNITY_GROUP_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: ICommunityGroupSettings;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.TEXT })
  declare communityId: string;

  @BelongsTo(() => UserModel, { foreignKey: 'community_id', onDelete: 'CASCADE' })
  declare community: UserModel;
}
