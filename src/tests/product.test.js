const request = require('supertest');
const app = require ('../app');
require('../models')

let id;
let token

beforeAll(async() => {
    const user = {
        email:'test@gmail.com',
        password: 'test123456'
    }
    const res = await request(app).post('/users/login').send(user);
    token = res.body.token;
})

test('GET /products me debe traer todos los producto', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products debe de crearme un producto', async () => {
    const body = {
        title:"mause",
        description:"para gamer",
        brand:"Razer",
        price:"10.50",
    }
    const res = await request(app)
    .post('/products')
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(body.title);
    expect(res.body.id).toBeDefined();
})

test('PUT /products/:id me debe actualizar un producto', async () => {
    const product = {title:"mause actualizado"};
    const res = await request(app)
        .put(`/products/${id}`)
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(product.title)
})

test('DELETE /categories/:id debe eliminar una categoria', async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})