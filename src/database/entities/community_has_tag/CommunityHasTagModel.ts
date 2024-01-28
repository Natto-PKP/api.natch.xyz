import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { CommunityModel, ProfileTagModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export interface ICommunityHasTag extends ICore {
  communityId: string;
  tagId: string;
}

@Table({ tableName: 'community_has_tag' })
export class CommunityHasTagModel extends CoreModel implements ICommunityHasTag {
  @ForeignKey(() => CommunityModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare communityId: string;

  @ForeignKey(() => ProfileTagModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare tagId: string;

  @BelongsTo(() => CommunityModel, { foreignKey: 'community_id', onDelete: 'CASCADE' })
  declare community: CommunityModel;

  @BelongsTo(() => ProfileTagModel, { foreignKey: 'tag_id', onDelete: 'CASCADE' })
  declare tag: ProfileTagModel;
}
