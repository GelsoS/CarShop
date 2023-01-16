import { model, Model, models, Schema } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public createCar(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async getAllCar(): Promise<T[]> {
    const all = await this.model.find();
    return all;
  }
  
  public async getById(id: string) {
    const getId = await this.model.findById(id);
    return getId;
  }

  public async upgradeCar(id: string, car: object) {
    const update = await this.model.findByIdAndUpdate(id, car, { new: true });
    return update;
  }
}

export default AbstractODM;