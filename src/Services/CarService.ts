import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createPaymentDomain(car: ICar | null) {
    if (car) {
      return new Car(
        car,
      );
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.createCar(car);
    return this.createPaymentDomain(newCar);
  }

  public async getAllCar() {
    const carODM = new CarODM();
    const Cars = await carODM.getAllCar();
    return Cars.map((car) => this.createPaymentDomain(car));
  }

  public async GetById(id: string) {
    if (id.length !== 24) return { status: 422, message: { message: 'Invalid mongo id' } };
    const carODM = new CarODM();
    const car = await carODM.getById(id);
    if (!car) return { status: 404, message: { message: 'Car not found' } };
    const carobj = this.createPaymentDomain(car);
    return { status: 200, message: carobj };
  }
}

export default CarService;