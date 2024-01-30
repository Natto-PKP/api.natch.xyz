import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { ProfileModel, PlatformModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IProfileHasPlatform extends ICore {
  profileId: string;
  platformId: string;
}

@Table({ tableName: 'profile_has_platform' })
export class ProfileHasPlatformModel extends CoreModel implements IProfileHasPlatform {
  @ForeignKey(() => ProfileModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare profileId: string;

  @ForeignKey(() => PlatformModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare platformId: string;

  @BelongsTo(() => ProfileModel, { foreignKey: 'profile_id', onDelete: 'CASCADE' })
  declare profile: ProfileModel;

  @BelongsTo(() => PlatformModel, { foreignKey: 'platform_id', onDelete: 'CASCADE' })
  declare platform: PlatformModel;
}
