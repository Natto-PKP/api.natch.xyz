import {
  Table,
  Column,
  DataType,
  Unique,
  NotNull,
  Default,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import IdentifierService from '../utils/Identifier.util';
import { CoreModel } from './Core.model';
import { CompanyModel } from '.';

export interface EmployeeModelDataInterface {
  code: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  companyId?: string | null;
}

export interface EmployeeModelInterface extends EmployeeModelDataInterface {
  company?: CompanyModel | null;
}

@Table({ tableName: 'employee' })
export class EmployeeModel extends CoreModel implements EmployeeModelInterface {
  @Unique
  @NotNull
  @Default(() => IdentifierService.generate({ characters: ['number'], length: 6 }))
  @Column({ type: DataType.TEXT })
  declare code: string;

  @NotNull
  @Column({ type: DataType.TEXT })
  declare firstname: string;

  @NotNull
  @Column({ type: DataType.TEXT })
  declare lastname: string;

  @NotNull
  @Unique
  @Column({ type: DataType.TEXT })
  declare email: string;

  @NotNull
  @Column({
    type: DataType.TEXT,
    set(this: EmployeeModel, value: string) {
      const password = bcrypt.hashSync(value, 10);
      this.setDataValue('password', password);
    },
  })
  declare password: string;

  @ForeignKey(() => CompanyModel)
  @Column({ type: DataType.TEXT })
  declare companyId?: string | null;

  @BelongsTo(() => CompanyModel)
  declare company?: CompanyModel | null;
}
