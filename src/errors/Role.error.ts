import { UserRoleType } from '../enums/UserRoles.enum';

export default class RoleError extends Error {
  constructor(public roles: UserRoleType[], message?: string) {
    super(message || 'missing roles');
  }
}
