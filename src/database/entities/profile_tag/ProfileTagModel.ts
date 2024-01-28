import { AllowNull, Column, DataType, Default, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IProfileTag extends ICore {
  id: string;
  identifier: string;
  name: string;
  description?: string | null;
  isNsfw: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  icon?: string | null;
  color?: string | null;
}

@Table({ tableName: 'profile_tag' })
export class ProfileTagModel extends CoreModel implements IProfileTag {
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
  declare icon?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare color?: string | null;
}
