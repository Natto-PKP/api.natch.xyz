/* eslint-disable no-bitwise */
import {
  Table,
  Column,
  DataType,
  Unique,
  Default,
  AllowNull,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import IdentifierService from '../utils/Identifier.util';
import { CoreModel } from './Core.model';
import CheckUtil from '../utils/Check.util';
import { TarotCardInterface } from '../../typings';
import { UserModel } from './User.model';
import { UserTarotCardModel } from './UserTarotCard.model';

@Table({ tableName: 'tarot_card' })
export class TarotCardModel extends CoreModel implements TarotCardInterface {
  @Unique
  @AllowNull(false)
  @Default(() => IdentifierService.generate({ characters: ['lower', 'upper'], length: 7 }))
  @Column({ type: DataType.TEXT, validate: { is: CheckUtil.TAROT_CARD_IDENTIFIER } })
  declare identifier: string;

  @AllowNull(false)
  @Column({ type: DataType.TEXT, validate: { is: CheckUtil.TAROT_CARD_NAME } })
  declare name: string;

  @AllowNull(false)
  @Default(() => false)
  @Column({ type: DataType.BOOLEAN })
  declare isGenerated: boolean;

  @BelongsToMany(() => UserModel, () => UserTarotCardModel, 'userId')
  declare users: UserModel[];

  @HasMany(() => UserTarotCardModel, 'tarotCardId')
  declare userTarotCards: UserTarotCardModel[];
}
