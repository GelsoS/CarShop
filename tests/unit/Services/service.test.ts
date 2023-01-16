import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

const newCar = {
  model: 'fiesta',
  year: 2008,
  color: 'prata',
  status: true,
  buyValue: 25.990,
  doorsQty: 4,
  seatsQty: 5,
};

const outputCar = [{
  id: '63c5a05e720f86cd01847478',
  model: 'corsa',
  year: 200,
  color: 'verde',
  status: true,
  buyValue: 25.99,
  doorsQty: 4,
  seatsQty: 5,
}];

const output = {
  id: '63c5a05e720f86cd01847478',
  model: 'fiesta',
  year: 2008,
  color: 'prata',
  status: true,
  buyValue: 25.990,
  doorsQty: 4,
  seatsQty: 5,
};

const service = new CarService();

describe('testes da camada service', function () {
  it('ID invalido', async function () {
    sinon.stub(Model, 'findById').resolves({ message: 'Invalid mongo id' });  
    const result = await service.GetById('63c5a05e720f86cd0184740');
      
    expect(result.message).to.be.deep.equal({ message: 'Invalid mongo id' });
  });
  
  it('ID inexistente', async function () {
    sinon.stub(Model, 'findById').resolves(undefined);  
    const result = await service.GetById('63c5a05e720f86cd01847402');
      
    expect(result.message).to.be.deep.equal({ message: 'Car not found' });
  });

  it('buscar carro pelo ID', async function () {
    sinon.stub(Model, 'findById').resolves(output);
  
    const result = await service.GetById('63c5a05e720f86cd01847478');
    expect(result.message).to.be.deep.equal(output);
  });

  it('cadastrar carro no DB', async function () {
    sinon.stub(Model, 'create').resolves(output);
    const result = await service.createCar(newCar);

    expect(result).to.be.deep.equal(output);
  });

  it('buscar por todos os carros cadastrados no DB', async function () {
    const testCar = outputCar.map((car) => new Car(car));
    sinon.stub(Model, 'find').resolves(testCar);
    const result = await service.getAllCar();
    
    expect(result).to.be.deep.equal(testCar);
  });

  afterEach(function () {
    sinon.restore();
  });
});