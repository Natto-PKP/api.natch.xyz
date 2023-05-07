import Joi from 'joi';
import CheckUtil from '../utils/Check.util';

export default {
  body: {
    create: Joi.object({
      givenById: Joi.string().uuid(),
    }),
  },
  query: {
    search: Joi.object({
      name: Joi.string().regex(CheckUtil.TAROT_CARD_NAME),
      page: Joi.number().integer().min(0),
      limit: Joi.number().integer().min(0),
    }),
  },
};
