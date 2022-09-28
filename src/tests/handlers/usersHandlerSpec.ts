import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
let token = '';

describe('Tests for the User Handler', () => {
  beforeAll(async () => {
    const data = { firstName: 'U2', lastName: 'UL2', password: 'dummy' };
    const res = await request.post('/user').send(data);
    token = res.body;
  });

  it('Server should return OK code for post /user', async () => {
    const data = { firstName: 'U1', lastName: 'UL1', password: 'dummy' };
    const response = await request.post('/user').send(data);
    expect(response.status).toEqual(200);
  });

  it('Server should return OK code for /user/getToken', async () => {
    const data = { firstName: 'U2', lastName: 'UL2', password: 'dummy' };
    const response = await request.post('/user/getToken').send(data);
    expect(response.status).toEqual(200);
  });

  it('Server should return OK code for get /user', async () => {
    const response = await request.get('/user').set('authorization',token);
    expect(response.status).toEqual(200);
  });
});
