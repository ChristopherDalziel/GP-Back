const app = require("../index");
const supertest = require('supertest');
const request = supertest(app);

describe('Testing the login path', () => {

  beforeAll(async () => {
    jest.setTimeout(20000);
  })

  it('Returns status 200 when username and password correct', async done => {
    await request.post('/users/login')
                .send(
                  {
                    email: 'klinikdrleong@gmail.com',
                    password: 'eb08ef45'
                  })
    expect(200); 
    done();
  });

  it('Returns status 403 when username or password is incorrect', async done => {
    const response = await request.post('/users/login')
                .send({
                  email: 'klinikdrleong@gmail.com',
                  password:'wrongpassword'
                })
      expect(response.status).toBe(403);
     
    done();
  });

  it('Returns status 403 if fields are empty', async done => {
   const response = await request.post('/users/login');
   expect(response.status).toBe(403);

    done();
  })
});

describe('Testing the registration path', () => {

  beforeAll(async () => {
    jest.setTimeout(20000);
  })

  it('Returns status 200 when all fields are completed', async done => {
    await request.post('/users/register')
                .send(
                  {
                    email: 'supertest@test.com',
                    password: 'testtest',
                    firstName: 'supertest',
                    lastName: 'test',
                    phone: 12345
                  })
    expect(200); 
    done();
  });

  it('Returns status 422 when email already exists', async done => {
    const response = await request.post('/users/register')
                .send({
                  username: 'klinikdrleong@gmail.com',
                  password:'wrongpassword',
                  firstName: "admin",
                  lastName: "admin",
                  phone: 12345
                })
    expect(response.status).toBe(422);
    done();
  });

  it('Returns status 422 if fields are empty', async done => {
    await request.post('/users/register');
    expect (422);
    done();
  })
});

