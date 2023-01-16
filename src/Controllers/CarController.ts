import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.service = new CarService();
    this.next = next;
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.createCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const cars = await this.service.getAllCar();
    return this.res.status(200).json(cars);
  }

  public async getById() {
    const { id } = this.req.params;
    const { status, message } = await this.service.GetById(id);
    return this.res.status(status).json(message);
  }

  public async update() {
    const { id } = this.req.params;
    const { body } = this.req;
    
    const { status, message } = await this.service.update(id, body);
    return this.res.status(status).json(message);
  }
}
export default CarController;