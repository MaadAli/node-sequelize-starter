import request from 'supertest';
import app from '../server';

describe('main', () => {
  it('check connection', async () => {
    const res = await request(app).get('/').send();
    expect(res.statusCode).toBe(200);
  });
});
