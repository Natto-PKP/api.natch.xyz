import type { NextFunction, Response } from 'express';
import ValidationError from '../errors/Validation.error';
import APIError from '../errors/API.error';
import AuthentificationError from '../errors/Authentification.error';
import PermissionError from '../errors/Permission.error';
import RoleError from '../errors/Role.error';
import type { Request } from '../../typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error);

  if (error instanceof APIError) {
    const { code, status, message } = error;
    res.status(status).json({ status, code, message });
  } else if (error instanceof ValidationError) {
    const { message } = error;
    res.status(400).json({ status: 400, code: 'VALIDATION_FAILED', message });
  } else if (error instanceof AuthentificationError) {
    const { message } = error;
    res.status(400).json({ status: 401, code: 'AUTH_FAILED', message });
  } else if (error instanceof PermissionError) {
    const { message, permissions } = error;
    res.status(400).json({
      status: 403, code: 'PERMISSIONS_MISSING', message, permissions,
    });
  } else if (error instanceof RoleError) {
    const { message, roles } = error;
    res.status(400).json({
      status: 403, code: 'ROLES_MISSING', message, roles,
    });
  } else {
    res.status(500).json({ status: 500, code: 'INTERNAL_ERROR', message: 'internal error' });
  }
};
