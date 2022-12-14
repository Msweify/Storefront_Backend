import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
let token = '';

describe('Tests for the dashboard Handler functions', () => {
  beforeAll(async () => {
    const data = { firstName: 'U7', lastName: 'UL7', password: 'dummy' };
    const res = await request.post('/user').send(data);
    token = res.body;
    const data2 = { name: 'lion', price: 50, category: 'toys'};
    await request.post('/products').send(data2).set('authorization',token);
    const data3 = { user_id: 1, status: 'active'};
    await request.post('/orders').send(data3).set('authorization',token);
  });

  it('Server should return OK code for get /productsPopular', async () => {
    const response = await request.get('/productsPopular');
    expect(response.status).toEqual(200);
  });
});
