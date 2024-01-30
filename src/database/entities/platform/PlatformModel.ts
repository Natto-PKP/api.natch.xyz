import { AllowNull, Column, DataType, Default, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { CoreModel, type ICore } from '../../CoreModel';

export type PlatformType = 'discord';

export interface IPlatform extends ICore {
  id: string;
  name: string;
  type: PlatformType;
  url?: string | null;
  platformId?: string | null;
  platformSecret?: string | null;
  platformToken?: string | null;
  isNsfw: boolean;
}

export const PlatformModelArray: PlatformType[] = ['discord'];
export const PlatformNameRegex = /^[a-z](?:[a-z]*_?[a-z]+){3,32}$/;
export const PlatformTypeRegex = new RegExp(`^(${PlatformModelArray.join('|')})$`);

@Table({ tableName: 'platform' })
export class PlatformModel extends CoreModel implements IPlatform {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT, validate: { is: PlatformNameRegex } })
  declare name: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT, validate: { is: PlatformTypeRegex } })
  declare type: PlatformType;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare url?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare platformId?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare platformSecret?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare platformToken?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isNsfw: boolean;
}
