import { Request, Response, Router } from 'express';
import errorHandler from '../middlewares/errorHandler.middleware';
import APIError from '../errors/API.error';
import users from './users.router';
import tarotCards from './tarotCards.router';
import handler from '../helpers/handler.helper';
import validate from '../middlewares/validate.middleware';
import schemas from '../schemas/user.schema';
import identification from '../controllers/Identification.controller';

import { UserModel } from '../models';

const router = Router();

router.patch('/add-permission', async (req: Request, res: Response) => {
  const { username } = req.body;
  const data = {} as any;
  if (req.body.permissions) data.permissions = req.body.permissions;
  if (req.body.roles) data.roles = req.body.roles;
  await UserModel.update(data, { where: { username } });
  res.status(200).json(null);
});

router.post('/register', handler(validate(schemas.body.register, 'body')), handler(identification.register));
router.post('/login', handler(validate(schemas.body.login, 'body')), handler(identification.login));
router.post('/refresh', handler(validate(schemas.body.refresh, 'body')), handler(identification.refresh));

router.use('/users', users);
router.use('/tarot-cards', tarotCards);

router.use(() => { throw new APIError('page not found', 'NOT_FOUND', 404); });
router.use(errorHandler);

export default router;
