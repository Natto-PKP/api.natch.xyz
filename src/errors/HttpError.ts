import { CoreError, CoreErrorOptions } from './CoreError';

export const ErrorStatus = [
  { status: 400, name: 'BAD_REQUEST', message: 'bad request', code: 5 },
  { status: 401, name: 'UNAUTHORIZED', message: 'unauthorized', code: 7 },
  { status: 403, name: 'FORBIDDEN', message: 'forbidden', code: 8 },
  { status: 404, name: 'NOT_FOUND', message: 'not found', code: 3 },
  { status: 409, name: 'CONFLICT', message: 'conflict', code: 4 },
  { status: 500, name: 'INTERNAL', message: 'internal error', code: 1 },
  { status: 501, name: 'NOT_IMPLEMENTED', message: 'not implemented', code: 2 },
  { status: 503, name: 'UNAVAILABLE', message: 'unavailable', code: 0 },
] as const;

export type ErrorStatusCodeNames = (typeof ErrorStatus)[number]['name'];
export type ErrorStatusCodeStatus = (typeof ErrorStatus)[number]['status'];
export type ErrorStatusCodeKeys = ErrorStatusCodeNames | ErrorStatusCodeStatus;

export interface HttpErrorOptions extends CoreErrorOptions {
  keepRequest?: boolean; // default: false
  keepResponse?: boolean; // default: false
}

export class HttpError extends CoreError {
  public status: ErrorStatusCodeStatus;
  public keepRequest: boolean;
  public keepResponse: boolean;

  constructor(status: ErrorStatusCodeKeys = 500, message: string | null = null, options?: HttpErrorOptions | null) {
    const err = ErrorStatus.find((err) => err.status === status || err.name === status);
    super(err?.code || 0, message || err?.message || 'unknown error', options);

    this.status = err?.status || 500;
    this.keepRequest = options?.keepRequest ?? false;
    this.keepResponse = options?.keepResponse ?? false;
  }
}

export const HttpErr = (
  status: ErrorStatusCodeKeys = 500,
  message: string | null = null,
  options?: HttpErrorOptions | null
) => {
  return new HttpError(status, message, options);
};
