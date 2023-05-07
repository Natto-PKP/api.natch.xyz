import type { Schema } from 'joi';
import type { NextFunction, Response } from 'express';
import ValidationError from '../errors/Validation.error';
import type { Request } from '../../typings';

export default (schema: Schema, prop: 'body' | 'query' | 'params') => {
  const controller = (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[prop]);
    if (error) throw new ValidationError(error.message);
    if (value) req[prop] = value;

    next();
  };

  return controller;
};
