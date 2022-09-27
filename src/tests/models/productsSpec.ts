import { products, productsModel } from '../../models/products';

const prod = new productsModel();

describe('Products table: create table testing', () => {
  it('Should have create method', () => {
    expect(prod.create).toBeDefined();
  });

  it('create should return a list of products', async () => {
    let product: products = { name: 'bear', price: 100, category: 'toys' };
    await prod.create(product);
    product = { name: 'tiger', price: 80, category: 'toys' };
    await prod.create(product);
    product = { name: 'eagle', price: 120, category: 'toys' };
    await prod.create(product);
    product = { name: 'toyota', price: 8000, category: 'cars' };
    await prod.create(product);
    product = { name: 'honda', price: 12000, category: 'cars' };
    await prod.create(product);
    product = { name: 'BMW', price: 30000, category: 'cars' };
    await prod.create(product);
    product = { name: 'honda2', price: 15000, category: 'cars' };
    await prod.create(product);
    product = { name: 'lexus', price: 25000, category: 'cars' };
    await prod.create(product);
    const res = await prod.index();
    expect(res.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Products table: continue table testing', () => {
  beforeAll(async () => {
    let product: products = { name: 'bear', price: 100, category: 'toys' };
    await prod.create(product);
    product = { name: 'tiger', price: 80, category: 'toys' };
    await prod.create(product);
    product = { name: 'eagle', price: 120, category: 'toys' };
    await prod.create(product);
    product = { name: 'toyota', price: 8000, category: 'cars' };
    await prod.create(product);
    product = { name: 'honda', price: 12000, category: 'cars' };
    await prod.create(product);
    product = { name: 'BMW', price: 30000, category: 'cars' };
    await prod.create(product);
    product = { name: 'honda2', price: 15000, category: 'cars' };
    await prod.create(product);
    product = { name: 'lexus', price: 25000, category: 'cars' };
    await prod.create(product);
  });

  it('create should update price of products', async () => {
    const field = 'price';
    const newValue = 120;
    const res = await prod.update(1, field, newValue);
    expect(res.price).toEqual(120);
  });

  it('Should show entire table', async () => {
    const res = await prod.index();
    expect(res.length).toBeGreaterThanOrEqual(1);
  });

  it('Should show product with id 2', async () => {
    const res = await prod.show(2);
    expect(res.price).toBeGreaterThan(0);
  });
});
