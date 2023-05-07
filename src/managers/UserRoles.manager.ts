import { UserPermissionArray, UserPermissionType } from '../enums/UserPermissions.enum';
import { UserRoleType, UserRoles } from '../enums/UserRoles.enum';
import FlagManager from './Flag.manager';

const USER_ROLE_HIERARCHY = [
  'OWNER',
  'ADMINISTRATOR',
  'MODERATOR',
  'SUPPORT',
  'COMMUNITY_USER',
  'BASIC_USER',
] as UserRoleType[];

const USER_ROLE_PERMISSIONS = {
  OWNER: UserPermissionArray,
  ADMINISTRATOR: ['MANAGE_TICKET', 'MANAGE_USER', 'MANAGE_USER_COMMENT', 'MANAGE_USER_MESSAGE', 'MANAGE_USER_PERMISSION', 'MANAGE_USER_POINT', 'MANAGE_USER_REACT', 'MANAGE_USER_ROLE', 'MANAGE_USER_TAROT_CARD', 'REMOVE_USER'],
  MODERATOR: ['MANAGE_USER', 'MANAGE_USER_COMMENT', 'MANAGE_USER_MESSAGE', 'MANAGE_USER_REACT'],
  SUPPORT: ['MANAGE_TICKET'],
  COMMUNITY_USER: ['EXCHANGE_TAROT_CARD'],
  BASIC_USER: ['CREATE_TICKET', 'HAVE_POINTS', 'HAVE_TAROT_CARDS', 'REACT', 'SEND_COMMENT', 'SEND_MESSAGE'],
} as { [UserRole in keyof typeof UserRoles]: UserPermissionType[] };

class UserRoleManager extends FlagManager<typeof UserRoles> {
  hierarchy = USER_ROLE_HIERARCHY;

  permissions = USER_ROLE_PERMISSIONS;

  constructor() { super(UserRoles); }

  highest(roles: UserRoleType[]) {
    let highestRoleIndex = this.hierarchy.indexOf('BASIC_USER');

    for (let i = 0; i < roles.length; i += 1) {
      const currentRoleIndex = this.hierarchy.indexOf(roles[i]);
      if (highestRoleIndex && highestRoleIndex > currentRoleIndex) {
        highestRoleIndex = currentRoleIndex;
      }
    }

    return this.hierarchy[highestRoleIndex];
  }

  position(role: UserRoleType) {
    return this.hierarchy.indexOf(role);
  }

  permissionsOf(roles: UserRoleType[]) {
    const permissions = roles.reduce((acc, r) => {
      const result = [...acc, ...this.permissions[r]];
      return result;
    }, [] as UserPermissionType[]);

    return [...new Set(permissions)];
  }
}

export default new UserRoleManager();
