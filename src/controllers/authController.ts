require('dotenv').config();
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Express, Request, Response, NextFunction } from 'express';
import { userModel } from '../models/user';
import AppError from '../utils/errorHandler';

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string = '';
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    console.log(process.env.JWT_SECRET_KEY);
    if (!token) {
      return next(new AppError('Unauthorized', 401));
    }
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as { id: string; iat: number };
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(token);
    console.log(decodedToken);

    if (decodedToken.iat > currentTime) {
      return next(new AppError('Token expired', 401));
    }

    const user = await userModel.findById(decodedToken.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }
    {
      (req as any).user = user;
    }

    next();
  } catch (err: any) {
    next(new AppError(err.message, 500));
  }
};

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.jwt) {
      return next(new AppError('Please log in or sign up', 401));
    }

    const decodedToken = jwt.verify(
      req.cookies.jwt,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    const currentTime = Math.floor(Date.now() / 1000);
    if (
      !decodedToken ||
      decodedToken.exp === undefined ||
      decodedToken.iat === undefined
    ) {
      return next(new AppError('Invalid token', 401));
    }
    if (decodedToken.exp < currentTime) {
      return next(new AppError('Session expired, please log in again', 401));
    }

    const user = await userModel.findById(decodedToken.id);

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    res.locals.user = user;
    next();
  } catch (err) {
    return next(new AppError('Authentication failed', 401));
  }
};

export { isAuthenticated, isLoggedIn };