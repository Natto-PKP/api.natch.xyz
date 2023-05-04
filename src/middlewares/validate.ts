import type { Schema } from 'joi';
import type { NextFunction, Request, Response } from 'express';

import APIError from '../errors/APIError';

export default (schema: Schema, prop: 'body' | 'params' | 'query') => {
  const controller = (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[prop]);
    if (error) throw new APIError(error.message, 400);
    if (value) req[prop] = value;

    next();
  };

  return controller;
};
