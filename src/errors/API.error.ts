import type { APIErrorCodeType } from '../enums/APIErrorCodes.enum';

export default class APIError extends Error {
  constructor(message: string, public code: APIErrorCodeType, public status: number) {
    super(message);
  }
}
