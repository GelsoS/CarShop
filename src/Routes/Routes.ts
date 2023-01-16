import { Router } from 'express';
import Car from '../Controllers/CarController';

const routes = Router();

routes.post('/cars', (req, res, next) => new Car(req, res, next).create());

routes.get('/cars', (req, res, next) => new Car(req, res, next).getAll());

routes.get('/cars/:id', (req, res, next) => new Car(req, res, next).getById());

routes.put('/cars/:id', (req, res, next) => new Car(req, res, next).update());

export default routes;