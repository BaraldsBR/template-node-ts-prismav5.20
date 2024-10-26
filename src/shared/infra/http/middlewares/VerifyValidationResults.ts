import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import AppError from '@shared/errors/AppError';

export default function verifyValidationResult(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const fieldErrors = errors.array().filter((error) => error.type === 'field');
    if (fieldErrors.length > 0) {
      throw new AppError(
        `Validation error: ${fieldErrors.map((error) => `field ${(error.type === 'field') ? error.path : ''} on ${(error.type === 'field') ? error.location : ''} is invalid`).join(', ')}.`,
      );
    } else throw new AppError('Unkown validation error', 400);
  }

  return next();
}
