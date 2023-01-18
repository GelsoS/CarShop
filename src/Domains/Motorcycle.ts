import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(motorcycle: IMotorcycle) {
    super({
      id: motorcycle.id,
      model: motorcycle.model,
      year: motorcycle.year,
      color: motorcycle.color,
      status: motorcycle.status,
      buyValue: motorcycle.buyValue,
    });
   
    this.category = motorcycle.category;
    this.engineCapacity = motorcycle.engineCapacity;
  }
}
export default Motorcycle;