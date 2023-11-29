const request = require('supertest');
const app = require ('../app');

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

test('GET /categories debe de retornarme todos las categorias', async () => {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories debe de crearme una categoria', async () => {
    const category = {
        name:"Politi"
    }
    const res = await request(app).post('/categories').send(category).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(category.name);
    expect(res.body.id).toBeDefined();
})

test('PUT /categories/:id me debe actualizar una categoria', async () => {
    const category = {name:"loquai"};
    const res = await request(app)
        .put(`/categories/${id}`)
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(category.name)
})

test('DELETE /categories/:id debe eliminar una categoria', async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})
