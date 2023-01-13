import { Router } from 'express';
import Car from '../Controllers/CarController';

const routes = Router();
routes.post('/cars', (req, res, next) => new Car(req, res, next).create());

export default routes;