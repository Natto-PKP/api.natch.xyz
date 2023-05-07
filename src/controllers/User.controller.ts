import bcrypt from 'bcrypt';
import type { Response } from 'express';

import CheckUtil from '../utils/Check.util';
import AuthentificationError from '../errors/Authentification.error';
import UserService from '../services/User.service';
import APIError from '../errors/API.error';
import UserRolesManager from '../managers/UserRoles.manager';
import type * as Types from '../../typings';
import PermissionError from '../errors/Permission.error';

export default class UserController {
  // Delete an user
  static async delete(req: Types.Request, res: Response) {
    if (!req.user) throw new AuthentificationError('auth failed');
    const { userId } = req.params;

    const isSelf = req.user.id === userId;
    const user = isSelf ? req.user : await UserService.getById(userId, 'public');
    if (!user) throw new APIError('user not found', 'NOT_FOUND', 404);
    if (!isSelf && !req.user.permissions.includes('REMOVE_USER')) throw new PermissionError(['REMOVE_USER']);

    await UserService.delete(userId);
    res.status(204).json(null);
  }

  // Get an user by id or username
  static async get(req: Types.Request, res: Response) {
    const { identifier } = req.params;
    const user = CheckUtil.UUID.test(identifier) ? await UserService.getById(identifier, 'public') : await UserService.getByUsername(identifier, 'public');
    if (!user) throw new APIError('user not found', 'NOT_FOUND', 404);
    res.status(200).json(user);
  }

  // Get all users
  static async getAll(req: Types.Request, res: Response) {
    const users = await UserService.search(req.query, 'public');
    res.status(200).json(users);
  }

  // Get current user
  static async getMe(req: Types.Request, res: Response) {
    if (!req.user) throw new AuthentificationError('auth failed');
    res.status(200).json(req.user);
  }

  // Update an user
  static async update(req: Types.Request, res: Response) {
    if (!req.user) throw new AuthentificationError('auth failed');

    // User definition
    const { userId } = req.params;
    const isSelf = req.user.id === userId;
    const target = isSelf ? req.user : await UserService.getById(userId, 'public');
    if (!target) throw new APIError('user not found', 'NOT_FOUND', 404);

    // Get body
    const body = req.body as Types.UserUpdateBody;

    // Permissions check
    if ((body.email || body.password) && !isSelf) throw new APIError('can\'t update credentials', 'PERMISSIONS_MISSING', 403);
    if (body.pseudo && !isSelf && !req.user.permissions.includes('MANAGE_USER')) throw new PermissionError(['MANAGE_USER'], 'can\'t update pseudo');
    if (body.username && !req.user.permissions.includes('MANAGE_USER')) throw new PermissionError(['MANAGE_USER'], 'can\'t update username');
    if (body.points && !req.user.permissions.includes('MANAGE_USER_POINT')) throw new PermissionError(['MANAGE_USER_POINT'], 'can\'t update points');

    if (body.permissions || body.roles) {
      if (body.permissions && !req.user.permissions.includes('MANAGE_USER_PERMISSION')) throw new PermissionError(['MANAGE_USER_PERMISSION'], 'can\'t update permissions');
      if (body.roles && !req.user.permissions.includes('MANAGE_USER_ROLE')) throw new PermissionError(['MANAGE_USER_ROLE'], 'can\'t update roles');

      const userHighestRole = UserRolesManager.highest(req.user.roles);
      const targetHighestRole = UserRolesManager.highest(target.roles);
      const userPosition = UserRolesManager.position(userHighestRole);
      const targetPosition = UserRolesManager.position(targetHighestRole);
      if (targetPosition > userPosition) throw new APIError('user highest role is below target highest role', 'WRONG_LOGIC', 400);
      if (targetPosition === userPosition) throw new APIError('user highest role is equal of target highest role', 'WRONG_LOGIC', 400);

      const targetRolePermissions = UserRolesManager.permissionsOf(body.roles || target.roles);
      if (body.permissions && !body.permissions.every((p) => targetRolePermissions.includes(p))) throw new APIError('target don\'t have right roles for some permissions', 'WRONG_LOGIC', 400);
    }

    // Alter value
    if (body.password) body.password = await bcrypt.hash(body.password, 10);

    await UserService.update(userId, body);
    res.status(200).json(null);
  }
}
