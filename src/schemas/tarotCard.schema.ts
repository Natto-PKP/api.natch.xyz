import Joi from 'joi';
import CheckUtil from '../utils/Check.util';

const name = Joi.string().regex(CheckUtil.TAROT_CARD_NAME);

export default {
  body: {
    create: Joi.object({
      name: name.required(),
      isGenerated: Joi.boolean().required(),
    }).required().length(2),

    update: Joi.object({
      name,
      isGenerated: Joi.boolean(),
    }).required().min(1).max(2),
  },
  query: {
    search: Joi.object({
      name,
      page: Joi.number().integer().min(0),
      size: Joi.number().integer().min(0),
    }),
  },
};
