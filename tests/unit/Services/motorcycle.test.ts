import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const moto = 'Honda Cb 600f Hornet';

const newMotorcycle = {    
  model: moto,
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,      
};
const output = {
  id: '63c5a05e720f86cd01847478',
  model: moto,
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const outputMotorcycle = [{
  id: '63c5a05e720f86cd01847478',
  model: 'Honda XRE 190',
  year: 2019,
  color: 'orange',
  status: true,
  buyValue: 18.000,
  category: 'Street',
  engineCapacity: 190,
}];

const input = {
  model: moto,
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const invalidID = 'Invalid mongo id';
const service = new MotorcycleService();

describe('testes da camada service Motorcycles', function () {
  it('ID invalido ao buscar', async function () {
    sinon.stub(Model, 'findById').resolves({ message: invalidID });  
    const result = await service.GetById('63c5a05e720f86cd0184740');
      
    expect(result.message).to.be.deep.equal({ message: invalidID });
  });
  
  it('ID inexistente ao buscar', async function () {
    sinon.stub(Model, 'findById').resolves(undefined);  
    const result = await service.GetById('63c5a05e720f86cd01847402');
      
    expect(result.message).to.be.deep.equal({ message: 'Motorcycle not found' });
  });

  it('buscar moto pelo ID', async function () {
    sinon.stub(Model, 'findById').resolves(output);
  
    const result = await service.GetById('63c5a05e720f86cd01847478');
    expect(result.message).to.be.deep.equal(output);
  });

  it('cadastrar moto no DB', async function () {
    sinon.stub(Model, 'create').resolves(output);
    const result = await service.createMotorcycle(newMotorcycle);

    expect(result).to.be.deep.equal(output);
  });

  it('buscar por todas as motos cadastradas no DB', async function () {
    const testMoto = outputMotorcycle.map((motorcycle) => new Motorcycle(motorcycle));
    sinon.stub(Model, 'find').resolves(testMoto);
    const result = await service.getAllMotorcycle();
    
    expect(result).to.be.deep.equal(testMoto);
  });

  it('atualizar moto', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(output);
    const result = await service.update('63c5a05e720f86cd01847478', input);
    expect(result.message).to.be.deep.equal(output);
  });

  it('ID invalido ao atualizar moto', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves({ message: invalidID });  
    const result = await service.update('63c5a05e720f86cd0184740', input);
      
    expect(result.message).to.be.deep.equal({ message: invalidID });
  });
  
  it('ID inexistente ao atualizar moto', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(undefined);  
    const result = await service.update('63c5a05e720f86cd01847402', input);
      
    expect(result.message).to.be.deep.equal({ message: 'Motorcycle not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});