import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { TeamModel, TagModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export interface ITeamHasTag extends ICore {
  teamId: string;
  tagId: string;
}

@Table({ tableName: 'team_has_tag' })
export class TeamHasTagModel extends CoreModel implements ITeamHasTag {
  @ForeignKey(() => TeamModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare teamId: string;

  @ForeignKey(() => TagModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare tagId: string;

  @BelongsTo(() => TeamModel, { foreignKey: 'team_id', onDelete: 'CASCADE' })
  declare team: TeamModel;

  @BelongsTo(() => TagModel, { foreignKey: 'tag_id', onDelete: 'CASCADE' })
  declare tag: TagModel;
}
