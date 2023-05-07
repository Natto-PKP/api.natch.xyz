import type { NextFunction, Response } from 'express';
import type { Request } from '../../typings';

type Controller = (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>;

export default (controller: Controller) => (req: Request, res: Response, next: NextFunction) => {
  const promise = Promise.resolve(controller(req, res, next)).catch(next);
  return promise;
};
