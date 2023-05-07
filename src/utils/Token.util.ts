import jwt from 'jsonwebtoken';

export default class TokenUtil {
  static generateAccessToken(userId: string, username: string) {
    return jwt.sign(
      { id: userId, username, type: 'access_token' },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' },
    );
  }

  static generateRefreshToken(userId: string, username: string) {
    return jwt.sign(
      { id: userId, username, type: 'refresh_token' },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' },
    );
  }

  static async verifyToken(token: string) {
    const promise = new Promise((res) => {
      const decoded = jwt.verify(token, <string>process.env.JWT_SECRET);
      res(decoded);
    });

    return promise as Promise<jwt.JwtPayload>;
  }
}
