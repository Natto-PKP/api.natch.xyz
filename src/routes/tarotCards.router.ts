import { Router } from 'express';
import auth from '../middlewares/auth.middleware';
import handler from '../helpers/handler.helper';
import validate from '../middlewares/validate.middleware';
import schemas from '../schemas/tarotCard.schema';
import controller from '../controllers/TarotCard.controller';

const router = Router();

router.post('/', handler(auth), validate(schemas.body.create, 'body'), handler(controller.create));
router.get('/', validate(schemas.query.search, 'query'), handler(controller.search));
router.get('/:identifier', handler(controller.get));
router.patch('/:tarotCardId', handler(auth), validate(schemas.body.update, 'body'), handler(controller.update));
router.delete('/:tarotCardId', handler(auth), handler(controller.delete));

export default router;
