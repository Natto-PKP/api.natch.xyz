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
import { CoreModel, type ICore } from '../../CoreModel';
import { UserModel } from '../user/UserModel';

export interface ITag extends ICore {
  id: string;
  identifier: string;
  name: string;
  description?: string | null;
  isNsfw: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  blockedReason?: string | null;
  blockedById?: string | null;
  blockedAt?: Date | null;
  icon?: string | null;
  color?: string | null;
}

@Table({ tableName: 'tag' })
export class TagModel extends CoreModel implements ITag {
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
  declare name: string;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare description?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isNsfw: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isVerified: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isBlocked: boolean;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare blockReason?: string | null;

  @AllowNull(true)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.TEXT })
  declare blockedById?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  declare blockedAt?: Date | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare icon?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare color?: string | null;

  @BelongsTo(() => UserModel, { foreignKey: 'blocked_by_id', onDelete: 'SET NULL' })
  declare blockedBy?: UserModel | null;
}
