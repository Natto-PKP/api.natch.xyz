import type { Response } from 'express';
import type Types from '../../typings/index';
import CheckUtil from '../utils/Check.util';
import TarotCardService from '../services/TarotCard.service';
import APIError from '../errors/API.error';
import AuthentificationError from '../errors/Authentification.error';
import PermissionError from '../errors/Permission.error';

export default class TarotCardController {
  // Create a card
  static async create(req: Types.Request, res: Response) {
    if (!req.user) throw new AuthentificationError('auth failed');
    if (!req.user.permissions.includes('MANAGE_TAROT_CARD')) throw new PermissionError(['MANAGE_TAROT_CARD']);

    const body = req.body as Types.TarotCardCreateBody;
    await TarotCardService.create(body);
    res.status(201).json(null);
  }

  // Delete a card
  static async delete(req: Types.Request, res: Response) {
    if (!req.user) throw new AuthentificationError('auth failed');
    if (!req.user.permissions.includes('MANAGE_TAROT_CARD')) throw new PermissionError(['MANAGE_TAROT_CARD']);

    const { tarotCardId } = req.params;
    const tarotCard = await TarotCardService.getById(tarotCardId);
    if (!tarotCard) throw new APIError('tarot card not found', 'NOT_FOUND', 404);

    await TarotCardService.delete(tarotCardId);
    res.status(204).json(null);
  }

  static async get(req: Types.Request, res: Response) {
    const { identifier } = req.params;
    const tarotCard = CheckUtil.UUID.test(identifier)
      ? await TarotCardService.getById(identifier)
      : await TarotCardService.getByIdentifier(identifier);
    if (!tarotCard) throw new APIError('tarot card not found', 'NOT_FOUND', 404);
    res.status(200).json(tarotCard);
  }

  static async search(req: Types.Request, res: Response) {
    const tarotCards = await TarotCardService.search(req.query);
    res.status(200).json(tarotCards);
  }

  static async update(req: Types.Request, res: Response) {
    if (!req.user) throw new AuthentificationError('auth failed');
    if (!req.user.permissions.includes('MANAGE_TAROT_CARD')) throw new PermissionError(['MANAGE_TAROT_CARD']);

    const { tarotCardId } = req.params;
    const tarotCard = await TarotCardService.getById(tarotCardId);
    if (!tarotCard) throw new APIError('tarot card not found', 'NOT_FOUND', 404);

    const body = req.body as Types.TarotCardUpdateBody;
    await TarotCardService.update(tarotCardId, body);

    res.status(200).json(null);
  }
}
