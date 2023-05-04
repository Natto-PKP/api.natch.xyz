import type { NextFunction, Request, Response } from 'express';

type Controller = (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>;

export default (controller: Controller) => (req: Request, res: Response, next: NextFunction) => {
  const promise = Promise.resolve(controller(req, res, next)).catch(next);
  return promise;
};
