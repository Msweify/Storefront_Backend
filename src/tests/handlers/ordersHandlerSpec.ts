import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
let token = '';

describe('Tests for the orders Handler post functions', () => {
  beforeAll(async () => {
    const data = { firstName: 'U5', lastName: 'UL5', password: 'dummy' };
    const res = await request.post('/user').send(data);
    token = res.body;
    const data2 = { name: 'lion', price: 50, category: 'toys'};
    await request.post('/products').send(data2).set('authorization',token);
    const data3 = { user_id: 1, status: 'active'};
    await request.post('/orders').send(data3).set('authorization',token);
  });

  it('Server should return OK code for post /orders', async () => {
    const data = { user_id: 1, status: 'completed'};
    const response = await request.post('/orders').send(data).set('authorization',token);
    expect(response.status).toEqual(200);
  });

  it('Server should return OK code for post /orders/:id/prodcuts', async () => {
    const data = { product_id: 1, quantity: 10};
    const response = await request.post('/orders/:1/prodcuts').send(data).set('authorization',token);
    expect(response.status).toEqual(200);
  });
});

describe('Tests for the orders Handler get functions', () => {
  beforeAll(async () => {
    const data = { firstName: 'U6', lastName: 'UL5', password: 'dummy' };
    const res = await request.post('/user').send(data);
    token = res.body;
    let data3 = { user_id: 1, status: 'active'};
    await request.post('/orders').send(data3).set('authorization',token);
    data3 = { user_id: 2, status: 'completed'};
    await request.post('/orders').send(data3).set('authorization',token);
  });

  it('Server should return OK code for get /ordersActiveUser/:id', async () => {
    const response = await (request.get('/ordersActiveUser/:1')).set('authorization',token);
    expect(response.status).toEqual(200);
  });

  it('Server should return OK code for get /ordersCompletedUser/:id', async () => {
    const response = await request.get('/ordersCompletedUser/:1').set('authorization',token);
    expect(response.status).toEqual(200);
  });
});
