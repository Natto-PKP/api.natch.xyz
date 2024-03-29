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

export interface IProfile extends ICore {
  id: string;
  identifier: string;
  name: string;
  pseudo: string;
  displayUserTags: bigint;
  avatar?: string | null;
  banner?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  emojiOrEmote?: string | null;
  status?: string | null;
  aboutMe?: string | null;
  languages: bigint;
  tags: bigint;
  // isPrivate: boolean;
  // isDefault: boolean;
  // isNsfw: boolean;
  userId: string;
}

export const PseudoRegex = /^[A-Za-z0-9](?:[A-Za-z0-9]*[-_ :]?[A-Za-z0-9]+){3,32}$/;

@Table({ tableName: 'profile' })
export class ProfileModel extends CoreModel implements IProfile {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT })
  declare identifier: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  declare name: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT, validate: { is: PseudoRegex } })
  declare pseudo: string;

  @AllowNull(false)
  @Default(0n)
  @Column({ type: DataType.BIGINT })
  declare displayUserTags: bigint;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare avatar?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare banner?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare primaryColor?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare secondaryColor?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare emojiOrEmote?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare status?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare aboutMe?: string | null;

  @AllowNull(false)
  @Default(0n)
  @Column({ type: DataType.BIGINT })
  declare languages: bigint;

  @AllowNull(false)
  @Default(0n)
  @Column({ type: DataType.BIGINT })
  declare tags: bigint;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.STRING })
  declare userId: string;

  @BelongsTo(() => UserModel, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  declare user: UserModel;
}
