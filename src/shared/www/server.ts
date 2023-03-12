import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import 'express-async-errors';
import '@shared/typeorm';
import uploadConfig from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());
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
const port = process.env.SERVER_URL || 3000;
app.listen(port, () => {
  console.log(`🛸 Servidor iniciado com sucesso na porta: ${port}`);
});
