import { UserPermissionType } from '../enums/UserPermissions.enum';

export default class PermissionError extends Error {
  constructor(public permissions: UserPermissionType[], message?: string) {
    super(message || 'missing permissions');
  }
}
