import { CoreError, CoreErrorOptions } from './CoreError';

export const HttpErrorStatus = [
  { status: 400, name: 'BAD_REQUEST', message: 'bad request', code: 5 },
  { status: 401, name: 'UNAUTHORIZED', message: 'unauthorized', code: 7 },
  { status: 403, name: 'FORBIDDEN', message: 'forbidden', code: 8 },
  { status: 404, name: 'NOT_FOUND', message: 'not found', code: 3 },
  { status: 409, name: 'CONFLICT', message: 'conflict', code: 4 },
  { status: 500, name: 'INTERNAL', message: 'internal error', code: 1 },
  { status: 501, name: 'NOT_IMPLEMENTED', message: 'not implemented', code: 2 },
  { status: 503, name: 'UNAVAILABLE', message: 'unavailable', code: 0 },
] as const;

export type HttpErrorStatusCodeNames = (typeof HttpErrorStatus)[number]['name'];
export type HttpErrorStatusCodeStatus = (typeof HttpErrorStatus)[number]['status'];
export type HttpErrorStatusCodeKeys = HttpErrorStatusCodeNames | HttpErrorStatusCodeStatus;

export interface HttpErrorOptions extends CoreErrorOptions {
  keepRequest?: boolean; // default: false
  keepResponse?: boolean; // default: false
}

export class HttpError extends CoreError {
  public status: HttpErrorStatusCodeStatus;
  public keepRequest: boolean;
  public keepResponse: boolean;

  constructor(status: HttpErrorStatusCodeKeys = 500, message: string | null = null, options?: HttpErrorOptions | null) {
    const err = HttpErrorStatus.find((err) => err.status === status || err.name === status);
    super(err?.code || 0, message || err?.message || 'unknown error', options);

    this.status = err?.status || 500;
    this.keepRequest = options?.keepRequest ?? false;
    this.keepResponse = options?.keepResponse ?? false;
  }

  static badRequest(message: string | null = null, options?: HttpErrorOptions | null) {
    return new HttpError(400, message, options);
  }

  static unauthorized(message: string | null = null, options?: HttpErrorOptions | null) {
    return new HttpError(401, message, options);
  }

  static forbidden(message: string | null = null, options?: HttpErrorOptions | null) {
    return new HttpError(403, message, options);
  }

  static notFound(message: string | null = null, options?: HttpErrorOptions | null) {
    return new HttpError(404, message, options);
  }

  static conflict(message: string | null = null, options?: HttpErrorOptions | null) {
    return new HttpError(409, message, options);
  }

  static internal(message: string | null = null, options?: HttpErrorOptions | null) {
    return new HttpError(500, message, options);
  }

  static notImplemented(message: string | null = null, options?: HttpErrorOptions | null) {
    return new HttpError(501, message, options);
  }

  static unavailable(message: string | null = null, options?: HttpErrorOptions | null) {
    return new HttpError(503, message, options);
  }
}
