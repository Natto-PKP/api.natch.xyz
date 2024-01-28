const Status = {
  BAD_REQUEST: { code: 400, message: 'bad request' },
  UNAUTHORIZED: { code: 401, message: 'unauthorized' },
  FORBIDDEN: { code: 403, message: 'forbidden' },
  NOT_FOUND: { code: 404, message: 'not found' },
  METHOD_NOT_ALLOWED: { code: 405, message: 'method not allowed' },
  TOO_MANY_REQUESTS: { code: 429, message: 'too many requests' },
  INTERNAL_SERVER_ERROR: { code: 500, message: 'internal server error' },
  BAD_GATEWAY: { code: 502, message: 'bad gateway' },
  SERVICE_UNAVAILABLE: { code: 503, message: 'service unavailable' },
  GATEWAY_TIMEOUT: { code: 504, message: 'gateway timeout' },
};

const StatusByCode = Object.fromEntries(
  Object.entries(Status).map(([key, value]) => [value.code, { key, ...value }])
) as { [key: number]: { key: string; code: number; message: string } };

export interface ApiErrorOptions {
  message?: string | null;
  code?: number | null;
  details?: { [key: string]: unknown } | { [key: string]: unknown }[] | null;
}

export class ApiError extends Error {
  public status: number;
  public code?: ApiErrorOptions['code'];
  public details?: ApiErrorOptions['details'];

  constructor(status: number | keyof typeof Status, options?: ApiErrorOptions) {
    const statusCode = typeof status === 'number' ? status : Status[status].code;
    const message = options?.message || StatusByCode[statusCode].message || 'unknown error';

    super(message);

    this.status = statusCode;
    this.code = options?.code;
    this.details = options?.details;

    Error.captureStackTrace(this, ApiError);
  }
}
