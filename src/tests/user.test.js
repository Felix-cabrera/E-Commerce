const request = require('supertest');
const app = require ('../app');

let id;
let token;

test('POST /users debe de crearme un usuario', async () => {
    const body = {
        firstName:"Guillermo",
        lastName:"Bernaola",
        email:"guillermo45@gmail.com",
        password:"654321",
        phone:"956858547"
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
})

test('POST /users/login acceder la cuenta creada', async () => {
    const body = {
        email:'guillermo45@gmail.com',
        password:'654321',
    }
    const res = await request(app).post('/users/login').send(body).set('Authorization', `Bearer ${token}`);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
})

test('GET /users debe de retornarme todos los usuarios', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /users/login debe retornar credenciales incorectas', async () => {
    const body = {
        email:'incorrecto@gmail.com',
        password:'incorrecto',
    }
    const res = await request(app).post('/users/login').send(body);
    expect(res.status).toBe(401);
})

test('PUT /users/:id me debe actualizar un usuario', async () => {
    const user = {firstName:"Felixas"};
    const res = await request(app)
        .put(`/users/${id}`)
        .send(user)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName)
})

test('Delete /users:id debe de eliminarme un usuario ', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
})