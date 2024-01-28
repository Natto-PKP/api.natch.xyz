import type { Request, Response, NextFunction } from 'express';

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export function AsyncErrorHandler(handler: Handler) {
  return (req: Request, res: Response, next: NextFunction) => {
    const promise = Promise.resolve(handler(req, res, next)).catch(next);
    return promise;
  };
}
