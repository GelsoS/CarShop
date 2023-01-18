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

  public create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async getAll(): Promise<T[]> {
    const all = await this.model.find();
    return all;
  }
  
  public async getById(id: string) {
    const getId = await this.model.findById(id);
    return getId;
  }

  public async upgrade(id: string, veicle: object) {
    const update = await this.model.findByIdAndUpdate(id, veicle, { new: true });
    return update;
  }
}

export default AbstractODM;