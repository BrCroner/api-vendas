import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res, next) => res.json({ message: 'Olá mundo!' }));

export default routes;
