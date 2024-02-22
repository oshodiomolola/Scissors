import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  result?: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode || 500;
  err.result = err.result || 'error';

  res.status(err.statusCode).json({
    result: err.result,
    message: err.message
  });
};

export default errorHandler;
