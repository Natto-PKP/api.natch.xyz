/* eslint-disable no-bitwise */
import {
  Table,
  Column,
  DataType,
  Unique,
  NotNull,
  Default,
  HasMany,
} from 'sequelize-typescript';
import FlagsManager from '../managers/Flags.manager';
import IdentifierService from '../utils/Identifier.util';
import { EmployeeModel } from '.';
import { CoreModel } from './Core.model';

// Company catégories flags
export type CompanyCategoriesType = keyof typeof CompanyCategories;
export const CompanyCategories = { SMALL: 1n << 0n, MEDIUM: 2n << 0n, LARGE: 3n << 0n };
export const CompanyCategoriesManager = new FlagsManager(CompanyCategories);

// Base data interface
export interface CompanyModelDataInterface {
  code: string;
  name: string;
  slogan?: string | null;
  country?: string | null;
  postalCode?: string | null;
  street?: string | null;
  categories?: CompanyCategoriesType[] | null;
}

// Relation + Base data interface
export interface CompanyModelInterface extends CompanyModelDataInterface {
  employees: EmployeeModel[];
}

@Table({ tableName: 'company' })
export class CompanyModel extends CoreModel implements CompanyModelInterface {
  @Unique
  @NotNull
  @Default(() => IdentifierService.generate({ characters: ['number'], length: 6 }))
  @Column({ type: DataType.TEXT })
  declare code: string;

  @NotNull
  @Column({ type: DataType.TEXT })
  declare name: string;

  @Column({ type: DataType.TEXT })
  declare slogan?: string | null;

  @Column({ type: DataType.TEXT })
  declare country?: string | null;

  @Column({ type: DataType.TEXT })
  declare postalCode?: string | null;

  @Column({ type: DataType.TEXT })
  declare street?: string | null;

  @Column({
    type: DataType.BIGINT,
    get(this: CompanyModel) {
      const bit = this.getDataValue('tags') as bigint | null;
      return bit ? CompanyCategoriesManager.resolve(BigInt(bit)) : null;
    },
    set(this: CompanyModel, keys: CompanyCategoriesType[]) {
      const value = keys.length ? CompanyCategoriesManager.merge(keys) : null;
      this.setDataValue('tags', value);
    },
  })
  declare tags?: CompanyCategoriesType[] | null;

  @HasMany(() => EmployeeModel)
  declare employees: EmployeeModel[];
}
