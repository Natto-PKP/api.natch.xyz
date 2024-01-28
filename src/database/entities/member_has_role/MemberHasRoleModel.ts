import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table } from 'sequelize-typescript';
import { CommunityRoleModel, MemberModel, UserModel } from '../.';
import { CoreModel, type ICore } from '../../CoreModel';

export interface IMemberHasRole extends ICore {
  memberId: string;
  roleId: string;
  addedById?: string | null;
}

@Table({ tableName: 'member_has_role' })
export class MemberHasRoleModel extends CoreModel implements IMemberHasRole {
  @ForeignKey(() => MemberModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare memberId: string;

  @ForeignKey(() => CommunityRoleModel)
  @PrimaryKey
  @Column({ type: DataType.TEXT })
  declare roleId: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.TEXT })
  declare addedById?: string | null;

  @BelongsTo(() => MemberModel, { foreignKey: 'member_id', onDelete: 'CASCADE' })
  declare member: MemberModel;

  @BelongsTo(() => CommunityRoleModel, { foreignKey: 'role_id', onDelete: 'CASCADE' })
  declare role: CommunityRoleModel;

  @BelongsTo(() => UserModel, { foreignKey: 'added_by_id', onDelete: 'SET NULL' })
  declare addedBy: UserModel;
}
