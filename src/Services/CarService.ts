import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null) {
    if (car) {
      return new Car(car);
    }    
    // return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCar() {
    const carODM = new CarODM();
    const Cars = await carODM.getAll();
    const result = Cars.map((car) => this.createCarDomain(car));
    return result;
  }

  public async GetById(id: string) {
    if (id.length !== 24) return { status: 422, message: { message: 'Invalid mongo id' } };
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    if (!car) return { status: 404, message: { message: 'Car not found' } };    
    const carobj = this.createCarDomain(car);
    return { status: 200, message: carobj };
  }

  public async update(id: string, car: object) {
    if (id.length !== 24) return { status: 422, message: { message: 'Invalid mongo id' } };
    const carODM = new CarODM();
    const result = await carODM.upgrade(id, car);
    if (!result) return { status: 404, message: { message: 'Car not found' } }; 
    const updated = this.createCarDomain(result);
    return { status: 200, message: updated };
  }
}

export default CarService;