import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.service = new MotorcycleService();
    this.next = next;
  }

  public async create() {
    const Motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.createMotorcycle(Motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const cars = await this.service.getAllMotorcycle();
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
export default MotorcycleController;