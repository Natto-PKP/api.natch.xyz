import bcrypt from 'bcrypt';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import type { Response } from 'express';

import TokenUtil from '../utils/Token.util';
import AuthentificationError from '../errors/Authentification.error';
import UserService from '../services/User.service';
import APIError from '../errors/API.error';
import type * as Types from '../../typings';

export default class IdentifierController {
  static async register(req: Types.Request, res: Response) {
    const body = req.body as Types.UserRegisterBody;
    const userByEmail = await UserService.getByEmail(body.email as string, 'all');
    if (userByEmail) throw new APIError('email already used', 'USER_EMAIL_ALREADY_USED', 400);

    const userByUsername = await UserService.getByUsername(body.username, 'all');
    if (userByUsername) throw new APIError('username already used', 'USER_USERNAME_ALREADY_USED', 400);

    const hashedPassword = await bcrypt.hash(body.password as string, 10);
    await UserService.create({ ...body, password: hashedPassword });

    res.status(201).json(null);
  }

  static async login(req: Types.Request, res: Response) {
    const body = req.body as Types.UserLoginBody;
    const userByEmail = body.email && await UserService.getByEmail(body.email, 'all');
    const userByUsername = body.username && await UserService.getByUsername(body.username, 'all');
    const user = userByEmail || userByUsername;
    if (!user) throw new APIError('user not found', 'NOT_FOUND', 404);

    const compare = await bcrypt.compare(body.password as string, user.password as string);
    if (!compare) throw new APIError('email and password don\'t match', 'USER_WRONG_LOGIN', 400);

    const accessToken = TokenUtil.generateAccessToken(user.id, user.username);
    const refreshToken = TokenUtil.generateRefreshToken(user.id, user.username);
    res.status(200).json({ accessToken, refreshToken });
  }

  static async refresh(req: Types.Request, res: Response) {
    const { refreshToken } = req.body as Types.UserRefreshBody;
    const decoded = await TokenUtil.verifyToken(refreshToken).catch((error) => {
      if (error instanceof TokenExpiredError) throw new AuthentificationError('token expired');
      if (error instanceof JsonWebTokenError) throw new AuthentificationError('invalid token');
      throw new AuthentificationError('auth failed');
    });

    if (decoded.type as string !== 'refresh_token') throw new AuthentificationError('wrong token type');

    const user = await UserService.getById(decoded.id, 'personal');
    if (!user) throw new APIError('user not found', 'NOT_FOUND', 404);

    const newAccessToken = TokenUtil.generateAccessToken(user.id, user.username);
    const newRefreshToken = TokenUtil.generateRefreshToken(user.id, user.username);
    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  }
}
