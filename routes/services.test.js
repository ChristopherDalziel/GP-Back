const app = require("../app");
const supertest = require('supertest');
const mongoose = require('mongoose')
const request = supertest(app);
const {login, invalidLogin, adminLogin} = require('../testing_utils/login.js');
require('dotenv').config();


  beforeAll(() => {

    const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.connect(process.env.DB_URL, dbConfig, err => {
      if (err) {
        console.log(`Error: ${err.message}`);
      }
    });
  });
    
  afterAll(() => {
    mongoose.disconnect()
  })

  describe('Testing the create path', () => {
  it('Returns status 200 if admin and required fields completed', async done => {
    const {token} = JSON.parse(await adminLogin());
    await request.post('/services/create', )
                .set('token', token)
                .send({
                  serviceName: "testingendpoint",
                  serviceDescription:"testing endpoint"
                });
      expect(200);
      done();
  });

  it('Returns status 400 if admin and required fields missing', async done => {
    const {token} = JSON.parse(await adminLogin());
    await request.post('/services/create')
                .set('token', token)
      expect(400);
      done();
  });

  it('Returns status 403 if not admin ', async done => {
    const {token} = JSON.parse(await login());
    await request.post('/services/create')
                .set('token', token)
                .send({
                  serviceName: "testingendpoint2",
                  serviceDescription:"testing endpoint2"
                })
      expect(403);
      done();
  });

});



