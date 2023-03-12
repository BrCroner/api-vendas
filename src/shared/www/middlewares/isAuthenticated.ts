import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError('Token JWT não existe!');

  //Bearer ijhia2dgig7aQmkiopivkjXUTygt
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Token JWT inválido.');
  }
}
