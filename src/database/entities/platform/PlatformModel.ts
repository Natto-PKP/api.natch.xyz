import { AllowNull, Column, DataType, Default, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { CoreModel, type ICore } from '../../CoreModel';

export const ExternalPlatformArray = ['discord', 'twitter', 'twitch', 'youtube', 'reddit'] as const;
export type ExternalPlatformType = (typeof ExternalPlatformArray)[number];

export const PlatformArray = ['account', 'team', 'application'] as const;
export type PlatformType = (typeof PlatformArray)[number];

export interface IPlatform extends ICore {
  id: string;
  name: string;
  type: PlatformType;
  externalType: ExternalPlatformType;
  url?: string | null;
  platformId?: string | null;
  platformSecret?: string | null;
  platformToken?: string | null;
  isVerified: boolean;
  isNsfw: boolean;
}

export const ExternalPlatformNameRegex = /^[a-z](?:[a-z]*_?[a-z]+){3,32}$/;
export const ExternalPlatformTypeRegex = new RegExp(`^(${ExternalPlatformArray.join('|')})$`);

export const PlatformTypeRegex = new RegExp(`^(${PlatformArray.join('|')})$`);

@Table({ tableName: 'platform' })
export class PlatformModel extends CoreModel implements IPlatform {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT, validate: { is: ExternalPlatformNameRegex } })
  declare name: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT, validate: { is: PlatformTypeRegex } })
  declare type: PlatformType;

  @AllowNull(false)
  @Column({ type: DataType.TEXT, validate: { is: PlatformTypeRegex } })
  declare externalType: ExternalPlatformType;

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
  declare isVerified: boolean;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isNsfw: boolean;
}
