import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
let token = '';

describe('Tests for the product Handler post functions', () => {
  beforeAll(async () => {
    const data = { firstName: 'U4', lastName: 'UL4', password: 'dummy' };
    const res = await request.post('/user').send(data);
    token = res.body;
  });

  it('Server should return OK code for post /products', async () => {
    const data = { name: 'lion', price: 50, category: 'toys'};
    const response = await request.post('/products').send(data).set('authorization',token);
    expect(response.status).toEqual(200);
  });
});

describe('Tests for the product Handler get functions', () => {
  beforeAll(async () => {
    const data1 = { firstName: 'U4', lastName: 'UL4', password: 'dummy' };
    const res = await request.post('/user').send(data1);
    token = res.body;
    const data2 = { name: 'lion', price: 50, category: 'toys'};
    await request.post('/products').send(data2).set('authorization',token);
  });

  it('Server should return OK code for get /products', async () => {
    const response = await request.get('/products');
    expect(response.status).toEqual(200);
  });

  it('Server should return OK code for get /products/:id', async () => {
    const response = await request.get('/products/:1');
    expect(response.status).toEqual(200);
  });

  it('Server should return OK code for get /productsCategory', async () => {
    const data = { category: 'toys' };
    const response = await request.get('/productsCategory').send(data);
    expect(response.status).toEqual(200);
  });
});
