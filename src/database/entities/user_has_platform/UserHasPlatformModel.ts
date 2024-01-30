import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { UserModel, PlatformModel } from '..';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IUserHasPlatformSettings {}

export interface IUserHasPlatform extends ICore {
  userId: string;
  platformId: string;
  description?: string | null;
  settings: IUserHasPlatformSettings;
  visibility: 'public' | 'private';
}

export const DEFAULT_USER_HAS_PLATFORM_SETTINGS: IUserHasPlatformSettings = {};

@Table({ tableName: 'user_has_platform' })
export class UserHasPlatformModel extends CoreModel implements IUserHasPlatform {
  @ForeignKey(() => UserModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare userId: string;

  @ForeignKey(() => PlatformModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare platformId: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description?: string | null;

  @AllowNull(false)
  @Default(DEFAULT_USER_HAS_PLATFORM_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: IUserHasPlatformSettings;

  @AllowNull(false)
  @Default('public')
  @Column({ type: DataType.TEXT })
  declare visibility: IUserHasPlatform['visibility'];

  @BelongsTo(() => UserModel, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  declare user: UserModel;

  @BelongsTo(() => PlatformModel, { foreignKey: 'platform_id', onDelete: 'CASCADE' })
  declare platform: PlatformModel;
}
