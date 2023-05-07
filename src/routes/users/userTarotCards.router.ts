import { Router } from 'express';
import auth from '../../middlewares/auth.middleware';
import handler from '../../helpers/handler.helper';
import validate from '../../middlewares/validate.middleware';
import schemas from '../../schemas/userTarotCard.schema';
import controller from '../../controllers/users/UserTarotCard.controller';

const router = Router({ mergeParams: true });

router.post('/:tarotCardId', handler(auth), validate(schemas.body.create, 'body'), handler(controller.add));
router.get('/', validate(schemas.query.search, 'query'), handler(controller.getAll));
router.delete('/:tarotCardId', handler(auth), handler(controller.remove));

export default router;
