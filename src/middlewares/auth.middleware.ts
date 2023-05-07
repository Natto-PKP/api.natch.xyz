import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import type { NextFunction, Response } from 'express';
import UserService from '../services/User.service';
import AuthentificationError from '../errors/Authentification.error';
import TokenUtil from '../utils/Token.util';
import APIError from '../errors/API.error';
import type { Request } from '../../typings';

export default async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) throw new AuthentificationError('auth failed');

  const decoded = await TokenUtil.verifyToken(token).catch((error: Error) => {
    if (error instanceof TokenExpiredError) throw new AuthentificationError('token expired');
    if (error instanceof JsonWebTokenError) throw new AuthentificationError('invalid token');
    throw new AuthentificationError('auth failed');
  });

  if (decoded.type as string !== 'access_token') throw new AuthentificationError('wrong token type');

  const user = await UserService.getById(decoded.id, 'personal');
  if (!user) throw new APIError('user not found', 'NOT_FOUND', 404);
  req.user = user;

  next();
};
