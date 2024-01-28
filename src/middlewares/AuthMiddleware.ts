import type { Request, Response, NextFunction } from 'express';
// import type { UserModel } from '../models';
import { ApiError } from '../errors/ApiError';

export type AuthType = 'user' | 'application' | 'system';

export interface AuthRequest extends Request {
  type: AuthType;
  // user: UserModel;
}

interface AuthMiddlewareOptions {
  required?: boolean | null;
  types?: AuthType[] | null;
}

export const AuthMiddleware = (options?: AuthMiddlewareOptions) => {
  const required = options?.required ?? true;
  const types = options?.types ?? ['user', 'application'];

  return (req: Request, _res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!required && !authorization) return next();
    if (required && !authorization) throw new ApiError('UNAUTHORIZED', { message: 'missing authorization header' });
    const [type, token] = (authorization || '').split(' ');

    if (type.toLowerCase() === 'application') throw new ApiError('NOT_FOUND', { message: 'not implemented' });
    else if (type.toLowerCase() === 'bearer') throw new ApiError('NOT_FOUND', { message: 'not implemented' });
    else throw new ApiError('UNAUTHORIZED', { message: 'not valid token type' });

    next();
  };
};
