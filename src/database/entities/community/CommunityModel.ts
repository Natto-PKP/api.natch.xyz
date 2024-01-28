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
import { UserModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export interface ICommunitySettings {}

export interface ICommunity extends ICore {
  id: string;
  identifier: string;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  cagegories: bigint;
  languages: bigint;
  isPrivate: boolean;
  isNsfw: boolean;
  isVerified: boolean;
  userCanJoin: boolean;
  icon?: string | null;
  banner?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  settings: ICommunitySettings;
  ownerId?: string | null;
}

export const DEFAULT_COMMUNITY_SETTINGS: ICommunitySettings = {};

@Table({ tableName: 'community' })
export class CommunityModel extends CoreModel implements ICommunity {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT })
  declare identifier: string;

  @AllowNull(false)
  @Unique
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
  @Default(DEFAULT_COMMUNITY_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: ICommunitySettings;

  @AllowNull(true)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.TEXT })
  declare ownerId?: string | null;

  @BelongsTo(() => UserModel, { foreignKey: 'owner_id', onDelete: 'CASCADE' })
  declare owner?: UserModel | null;
}
