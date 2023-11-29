const request = require('supertest');
const app = require('../app');
require('../models')

let id;
let token;

beforeAll(async() => {
    const user = {
        email:'test@gmail.com',
        password: 'test123456'
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
})

test('GET /cart debe de traerme los favoritos', async () => { 
    const res = await request(app)
        .get('/cart')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 })

 test('POST /cart debe de crearme una categoria', async () => {
    const body = {
        quantity:5
    }
    const res = await request(app).post('/cart').send(body).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(body.quantity);
    expect(res.body.id).toBeDefined();
})

test('DELETE /categories/:id debe eliminar una categoria', async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})