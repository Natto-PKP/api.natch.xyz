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
  allowNsfw: boolean;
  tags: bigint;
  settings: IUserSettings;
}

export const UsernameRegex = /^[a-z](?:[a-z]*_?[a-z]+){3,32}$/;
export const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,64}$/;

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
  @Column({ type: DataType.TEXT, validate: { is: UsernameRegex } })
  declare username: string;

  @AllowNull(true)
  @Unique
  @Column({ type: DataType.TEXT, validate: { isEmail: true } })
  declare email?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare password?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare allowNsfw: boolean;

  @AllowNull(false)
  @Default(0n)
  @Column({ type: DataType.BIGINT })
  declare tags: bigint;

  @AllowNull(false)
  @Default(DEFAULT_USER_SETTINGS)
  @Column({ type: DataType.JSONB })
  declare settings: IUserSettings;
}
