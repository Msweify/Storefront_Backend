import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
let token = '';

describe('Tests for the orders Handler post functions', () => {
  beforeAll(async () => {
    const data = { firstName: 'U5', lastName: 'UL5', password: 'dummy' };
    const res = await request.post('/user').send(data);
    token = res.body;
    const data2 = { name: 'lion', price: 50, category: 'toys', token: token };
    await request.post('/products').send(data2);
    const data3 = { user_id: 1, status: 'active', token: token };
    await request.post('/orders').send(data3);
  });

  it('Server should return OK code for post /orders', async () => {
    const data = { user_id: 1, status: 'completed', token: token };
    const response = await request.post('/orders').send(data);
    expect(response.status).toEqual(200);
  });

  it('Server should return OK code for post /orders/:id/prodcuts', async () => {
    const data = { product_id: 1, quantity: 10, token: token };
    const response = await request.post('/orders/:1/prodcuts').send(data);
    expect(response.status).toEqual(200);
  });
});

describe('Tests for the orders Handler get functions', () => {
  beforeAll(async () => {
    const data = { firstName: 'U6', lastName: 'UL5', password: 'dummy' };
    const res = await request.post('/user').send(data);
    token = res.body;
    let data3 = { user_id: 1, status: 'active', token: token };
    await request.post('/orders').send(data3);
    data3 = { user_id: 2, status: 'completed', token: token };
    await request.post('/orders').send(data3);
  });

  it('Server should return OK code for get /ordersActiveUser/:id', async () => {
    const data = { token: token };
    const response = await request.get('/ordersActiveUser/:1').send(data);
    expect(response.status).toEqual(200);
  });

  it('Server should return OK code for get /ordersCompletedUser/:id', async () => {
    const data = { token: token };
    const response = await request.get('/ordersCompletedUser/:1').send(data);
    expect(response.status).toEqual(200);
  });
});
