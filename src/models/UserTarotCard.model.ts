import {
  Model,
  Column,
  DataType,
  Table,
  AllowNull,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserTarotCardInterface } from '../../typings';
import { TarotCardModel, UserModel } from '.';

@Table({ tableName: 'user_tarot_card' })
export class UserTarotCardModel extends Model implements UserTarotCardInterface {
  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.TEXT, validate: { isUUID: 4 } })
  declare userId: string;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => TarotCardModel)
  @Column({ type: DataType.TEXT, validate: { isUUID: 4 } })
  declare tarotCardId: string;

  @AllowNull(true)
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.TEXT, validate: { isUUID: 4 } })
  declare givenById?: string | null;

  @BelongsTo(() => UserModel, 'userId')
  declare user: UserModel;

  @BelongsTo(() => TarotCardModel, 'tarotCardId')
  declare tarotCard: TarotCardModel;

  @BelongsTo(() => UserModel, 'givenById')
  declare givenBy?: UserModel | null;
}
