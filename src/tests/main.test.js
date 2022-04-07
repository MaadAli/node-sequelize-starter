import app from '../server';
import request from 'supertest';

describe('main', () => {
    it('check connection', async() => {
        const res = await request(app).get('/').send();
        expect(res.statusCode).toBe(200);
        
    })
})