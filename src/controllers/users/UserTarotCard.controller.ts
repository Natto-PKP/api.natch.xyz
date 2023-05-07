import type { Response } from 'express';

import UserTarotCardService from '../../services/UserTarotCard.service';
import UserService from '../../services/User.service';
import TarotCardService from '../../services/TarotCard.service';
import AuthentificationError from '../../errors/Authentification.error';
import PermissionError from '../../errors/Permission.error';
import APIError from '../../errors/API.error';
import type * as Types from '../../../typings';

export default class UserTarotCardController {
  static async add(req: Types.Request, res: Response) {
    if (!req.user) throw new AuthentificationError('auth failed');
    if (!req.user.permissions.includes('EXCHANGE_TAROT_CARD')) throw new PermissionError(['EXCHANGE_TAROT_CARD']);

    const user = await UserService.getById(req.params.userId, 'public');
    if (!user) throw new APIError('user not found', 'NOT_FOUND', 404);

    const tarotCard = await TarotCardService.getById(req.params.tarotCardId);
    if (!tarotCard) throw new APIError('tarot card not found', 'NOT_FOUND', 404);

    const relation = await UserTarotCardService.get(req.params.userId, req.params.tarotCardId);
    if (relation) throw new APIError('user and tarot card already associated', 'RELATION_EXISTS', 409);

    const body = req.body as Types.UserTarotCardCreateBody;
    await UserTarotCardService.create(user.id, tarotCard.id, body);
    res.status(201).json(null);
  }

  static async getAll(req: Types.Request, res: Response) {
    const user = await UserService.getById(req.params.userId, 'public');
    if (!user) throw new APIError('user not found', 'NOT_FOUND', 404);

    const tarotCards = await UserTarotCardService.getAll(user.id, req.query);
    res.status(200).json(tarotCards);
  }

  static async remove(req: Types.Request, res: Response) {
    if (!req.user) throw new AuthentificationError('auth failed');
    if (!req.user.permissions.includes('EXCHANGE_TAROT_CARD')) throw new PermissionError(['EXCHANGE_TAROT_CARD']);

    const relation = await UserTarotCardService.get(req.params.userId, req.params.tarotCardId);
    if (!relation) throw new APIError('relation not exist', 'RELATION_NOT_EXISTS', 409);

    await UserTarotCardService.delete(req.params.userId, req.params.tarotCardId);
    res.status(204).json(null);
  }
}
