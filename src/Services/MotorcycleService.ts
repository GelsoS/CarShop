import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcyclesODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null) {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }    
    // return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAllMotorcycle() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.getAll();
    const result = motorcycle.map((car) => this.createMotorcycleDomain(car));
    return result;
  }

  public async GetById(id: string) {
    if (id.length !== 24) return { status: 422, message: { message: 'Invalid mongo id' } };
    const motorcyclesODM = new MotorcycleODM();
    const motorcycle = await motorcyclesODM.getById(id);
    if (!motorcycle) return { status: 404, message: { message: 'Motorcycle not found' } };    
    const motorcycleobj = this.createMotorcycleDomain(motorcycle);
    return { status: 200, message: motorcycleobj };
  }

  public async update(id: string, motorcycle: object) {
    if (id.length !== 24) return { status: 422, message: { message: 'Invalid mongo id' } };
    const motorcyclesODM = new MotorcycleODM();
    const result = await motorcyclesODM.upgrade(id, motorcycle);
    if (!result) return { status: 404, message: { message: 'Motorcycle not found' } }; 
    const updated = this.createMotorcycleDomain(result);
    return { status: 200, message: updated };
  }
}

export default MotorcycleService;