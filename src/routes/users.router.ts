import { Router } from 'express';
import auth from '../middlewares/auth.middleware';
import handler from '../helpers/handler.helper';
import validate from '../middlewares/validate.middleware';
import schemas from '../schemas/user.schema';
import controller from '../controllers/User.controller';
import userTarotCardRouter from './users/userTarotCards.router';

const router = Router({ mergeParams: true });

router.use('/:userId/tarot-cards', userTarotCardRouter);

router.get('/me', handler(auth), handler(controller.getMe));
router.get('/', validate(schemas.query.search, 'query'), handler(controller.getAll));
router.get('/:identifier', handler(controller.get));
router.patch('/:userId', handler(auth), validate(schemas.body.update, 'body'), handler(controller.update));
router.delete('/:userId', handler(auth), handler(controller.delete));

export default router;
