import { v4 as uuid } from 'uuid';
import {
  Model,
  Column,
  Default,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

export interface CoreModelInterface {
  id: string;
}

export class CoreModel extends Model implements CoreModelInterface {
  @PrimaryKey
  @Default(() => uuid())
  @Column({ type: DataType.TEXT })
  declare id: string;
}
