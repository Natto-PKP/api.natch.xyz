import Joi from 'joi';
import CheckUtil from '../utils/Check.util';
import { UserPermissionArray } from '../enums/UserPermissions.enum';
import { UserRoleArray } from '../enums/UserRoles.enum';

const email = Joi.string().email();
const password = Joi.string().regex(CheckUtil.USER_PASSWORD);
const pseudo = Joi.string().regex(CheckUtil.USER_PSEUDO);
const username = Joi.string().regex(CheckUtil.USER_USERNAME);

export default {
  body: {
    login: Joi.object({
      email,
      username,
      password: password.required(),
    }).required().min(2).max(3),

    register: Joi.object({
      pseudo: pseudo.required(),
      username: username.required(),
      email: email.required(),
      password: password.required(),
    }).required().length(4),

    refresh: Joi.object({
      refreshToken: Joi.string().required(),
    }).required().length(1),

    update: Joi.object({
      pseudo,
      username,
      email: Joi.string().email(),
      password,
      permissions: Joi.array().items(Joi.string().valid(...UserPermissionArray)),
      roles: Joi.array().items(Joi.string().valid(...UserRoleArray)),
      points: Joi.number().integer().positive(),
    }).required().min(1).max(4),
  },
  query: {
    search: Joi.object({
      pseudo: Joi.string(),
      username: Joi.string(),
      page: Joi.string().regex(/^[0-9]+$/),
      limit: Joi.string().regex(/^[0-9]+$/),
    }),
  },
};
