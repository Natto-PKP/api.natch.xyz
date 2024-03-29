import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { ProfileModel, TagModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IProfileHasTag extends ICore {
  profileId: string;
  tagId: string;
}

@Table({ tableName: 'profile_has_tag' })
export class ProfileHasTagModel extends CoreModel implements IProfileHasTag {
  @ForeignKey(() => ProfileModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare profileId: string;

  @ForeignKey(() => TagModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare tagId: string;

  @BelongsTo(() => ProfileModel, { foreignKey: 'profile_id', onDelete: 'CASCADE' })
  declare profile: ProfileModel;

  @BelongsTo(() => TagModel, { foreignKey: 'tag_id', onDelete: 'CASCADE' })
  declare tag: TagModel;
}
