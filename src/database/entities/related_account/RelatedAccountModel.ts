import { AllowNull, Column, DataType, Default, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { CoreModel, type ICore } from '../../CoreModel';

export type RelatedAccountType = 'discord';

export interface IRelatedAccount extends ICore {
  id: string;
  name: string;
  type: RelatedAccountType;
  url?: string | null;
  relatedAccountId?: string | null;
  relatedAccountSecret?: string | null;
  relatedAccountToken?: string | null;
  isNsfw: boolean;
}

export const RelatedAccountModelArray: RelatedAccountType[] = ['discord'];
export const RelatedAccountNameRegex = /^[a-z](?:[a-z]*_?[a-z]+){3,32}$/;
export const RelatedAccountTypeRegex = new RegExp(`^(${RelatedAccountModelArray.join('|')})$`);

@Table({ tableName: 'related_account' })
export class RelatedAccountModel extends CoreModel implements IRelatedAccount {
  @PrimaryKey
  @Default(uuid)
  @Column({ type: DataType.TEXT })
  declare id: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.TEXT, validate: { is: RelatedAccountNameRegex } })
  declare name: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT, validate: { is: RelatedAccountTypeRegex } })
  declare type: RelatedAccountType;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare url?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare relatedAccountId?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare relatedAccountSecret?: string | null;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  declare relatedAccountToken?: string | null;

  @AllowNull(false)
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  declare isNsfw: boolean;
}
