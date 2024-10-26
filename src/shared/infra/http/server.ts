import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import 'express-async-errors';

import '@shared/container';

import AppError from '@shared/errors/AppError';

import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.get('/teste', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

app.use((err: Error & { type?: string }, _request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof SyntaxError && err.type === 'entity.parse.failed') {
    return response.status(400).json({
      status: 'error',
      message: 'Bad JSON',
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT || 3333}`);
});
