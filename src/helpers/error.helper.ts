import type { NextFunction, Request, Response } from 'express';

import APIError from '../errors/APIError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof APIError) {
    const { code, message } = error;
    res.status(code).json({ code, message });
  } else res.status(500).json({ code: 500, message: 'internal error' });
};
