const app = require("../index");
const supertest = require('supertest');
// const users = require('../users.json');

test("GET /", done => {
  supertest(app)
  .get("/")
  .expect(response => {
    expect(response.status).resolves.toBe(200)
    expect(response.body).resolves.toEqual('index controller page')
    done()
  })
})


