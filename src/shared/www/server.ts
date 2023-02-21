import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'err', message: error.message });
    }
    return response
      .status(500)
      .json({ status: 'err', message: 'Erro interno no sistema.' });
  },
);

app.listen(process.env.SERVER_URL || process.env.DEV_PORT, () => {
  console.log(`🛸 Servidor iniciado com sucesso!`);
});
