import jwt from 'jsonwebtoken';

import type { NextFunction, Request, Response } from 'express';

import APIError from '../errors/APIError';

export default (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) throw new APIError('auth is failed', 401);

  const decoded = jwt.verify(token, <string>process.env.JWT_SECRET);

  if (typeof decoded !== 'object') throw new APIError('auth is failed', 401);
  if (typeof decoded.id !== 'number') throw new APIError('auth is failed', 401);
  if (typeof decoded.ms !== 'number') throw new APIError('auth is failed', 401);

  if (req.params.userId && req.params.userId !== decoded.id.toString()) {
    throw new APIError('id does not match with token', 401);
  }

  next();
};
