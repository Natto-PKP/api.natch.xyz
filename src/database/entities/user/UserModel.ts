import { AllowNull, Column, DataType, Default, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IUserSettings {}

export interface IUser extends ICore {
  id: string;
  identifier: string;
  username: string;
  email?: string | null;
  password?: string | null;
  isVerified: boolean;
  allowNsfw: boolean;
  settings: IUserSettings;
}

export const DEFAULT_USER_SETTINGS: IUserSettings = {};

@Table({ tableName: 'user' })
export class UserModel extends CoreModel implements IUser {
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
  declare username: string;

  @AllowNull(true)
  @Unique
  @Column({ type: DataType.TEXT })
  declare email?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare password?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isVerified: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare allowNsfw: boolean;

  @AllowNull(false)
  @Default(DEFAULT_USER_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: IUserSettings;
}
