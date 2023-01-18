import { Router } from 'express';
import Car from '../Controllers/CarController';
import Motorcycle from '../Controllers/MotorcycleController';

const routes = Router();

routes.post('/cars', (req, res, next) => new Car(req, res, next).create());
routes.post('/motorcycles', (req, res, next) => new Motorcycle(req, res, next).create());

routes.get('/cars', (req, res, next) => new Car(req, res, next).getAll());
routes.get('/motorcycles', (req, res, next) => new Motorcycle(req, res, next).getAll());

routes.get('/cars/:id', (req, res, next) => new Car(req, res, next).getById());
routes.get('/motorcycles/:id', (req, res, next) => new Motorcycle(req, res, next).getById());

routes.put('/cars/:id', (req, res, next) => new Car(req, res, next).update());
routes.put('/motorcycles/:id', (req, res, next) => new Motorcycle(req, res, next).update());

export default routes;