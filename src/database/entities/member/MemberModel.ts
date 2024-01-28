import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { CommunityModel, ProfileModel, UserModel, CommunityInviteModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IMember extends ICore {
  id: string;
  userId: string;
  communityId: string;
  profileId: string;
  inviteId?: string | null;
}

@Table({ tableName: 'member', indexes: [{ unique: true, fields: ['user_id', 'community_id'] }] })
export class MemberModel extends CoreModel implements IMember {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.TEXT })
  declare userId: string;

  @AllowNull(false)
  @ForeignKey(() => CommunityModel)
  @Column({ type: DataType.TEXT })
  declare communityId: string;

  @AllowNull(false)
  @ForeignKey(() => ProfileModel)
  @Column({ type: DataType.TEXT })
  declare profileId: string;

  @AllowNull(true)
  @ForeignKey(() => CommunityInviteModel)
  @Column({ type: DataType.TEXT })
  declare inviteId?: string | null;

  @BelongsTo(() => UserModel, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  declare user: UserModel;

  @BelongsTo(() => CommunityModel, { foreignKey: 'community_id', onDelete: 'CASCADE' })
  declare community: CommunityModel;

  @BelongsTo(() => ProfileModel, { foreignKey: 'profile_id', onDelete: 'RESTRICT' })
  declare profile: ProfileModel;

  @BelongsTo(() => CommunityInviteModel, { foreignKey: 'invite_id', onDelete: 'SET NULL' })
  declare invite: CommunityInviteModel;
}
