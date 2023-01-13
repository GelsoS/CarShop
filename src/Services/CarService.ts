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
    console.log(newCar);    
    return this.createPaymentDomain(newCar);
  }
}

export default CarService;