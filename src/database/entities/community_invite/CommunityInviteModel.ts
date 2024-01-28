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
import { CommunityModel, MemberModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export interface ICommunityInviteSettings {}

export interface ICommunityInvite extends ICore {
  id: string;
  communityId: string;
  memberId: string;
  label?: string | null;
  code: string;
  maxUses?: number | null;
  uses: number;
  expiresAt?: Date | null;
  settings: ICommunityInviteSettings;
}

const DEFAULT_COMMUNITY_INVITE_SETTINGS: ICommunityInviteSettings = {};

@Table({ tableName: 'community_invite' })
export class CommunityInviteModel extends CoreModel implements ICommunityInvite {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @ForeignKey(() => CommunityModel)
  @Column({ type: DataType.TEXT })
  declare communityId: string;

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
  @Default(DEFAULT_COMMUNITY_INVITE_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: ICommunityInviteSettings;

  @BelongsTo(() => MemberModel, { foreignKey: 'member_id', onDelete: 'CASCADE' })
  declare member: MemberModel;

  @BelongsTo(() => CommunityModel, { foreignKey: 'community_id', onDelete: 'CASCADE' })
  declare community: CommunityModel;
}
