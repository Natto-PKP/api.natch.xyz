export enum APIErrorCodes {
  NOT_FOUND,
  USER_EMAIL_ALREADY_USED,
  USER_USERNAME_ALREADY_USED,
  USER_WRONG_LOGIN,
  AUTH_FAILED,
  PERMISSIONS_MISSING,
  ROLES_MISSING,
  INTERNAL_ERROR,
  VALIDATION_FAILED,
  WRONG_LOGIC,
  RELATION_EXISTS,
  RELATION_NOT_EXISTS,
}

export type APIErrorCodeType = keyof typeof APIErrorCodes;
