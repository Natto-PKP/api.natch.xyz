import { UserPermissions } from '../enums/UserPermissions.enum';
import FlagManager from './Flag.manager';

const UserPermissionManager = new FlagManager(UserPermissions);

export default UserPermissionManager;
