export const ErrorCodes = [
  { code: 0, name: 'UNKNOWN', message: 'unknown error' },
  { code: 1, name: 'INTERNAL', message: 'internal error' },
  { code: 2, name: 'NOT_IMPLEMENTED', message: 'not implemented' },
  { code: 3, name: 'NOT_FOUND', message: 'not found' },
  { code: 4, name: 'ALREADY_EXISTS', message: 'already exists' },
  { code: 5, name: 'INVALID_ARGUMENT', message: 'invalid argument' },
  { code: 6, name: 'UNAUTHENTICATED', message: 'unauthenticated' },
  { code: 7, name: 'UNAUTHORIZED', message: 'unauthorized' },
  { code: 8, name: 'PERMISSION_DENIED', message: 'permission denied' },
  { code: 9, name: 'ABORTED', message: 'aborted' },
] as const;

export type ErrorCodeNames = (typeof ErrorCodes)[number]['name'];
export type ErrorCodeCodes = (typeof ErrorCodes)[number]['code'];
export type ErrorCodeKeys = ErrorCodeNames | ErrorCodeCodes;

type Details = string | { [key: string]: unknown } | { [key: string]: unknown }[];

export interface CoreErrorOptions {
  label?: string;
  details?: Details | null;
  logit?: boolean; // default: true
}

export class CoreError extends Error {
  public label: string;
  public code: ErrorCodeCodes;
  public details: Details | null;
  public logit: boolean;

  constructor(code: ErrorCodeKeys = 0, message: string | null = null, options?: CoreErrorOptions | null) {
    const err = ErrorCodes.find((err) => err.code === code || err.name === code);
    super(message || err?.message || 'unknown error');

    this.label = options?.label || 'UNKNOWN';
    this.code = err?.code || 0;
    this.details = options?.details || null;
    this.logit = options?.logit ?? true;
  }
}
