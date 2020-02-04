

const app = require("../app");
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require("mongoose");
const {login,invalidLogin} = require('../testing_utils/login.js');

beforeAll(() => {
  const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.DB_URL, dbConfig, err => {
    if (err) {
      console.log(`Error: ${err.message}`);
    } else {
      console.log("Connected to MongoDB Atlas ✅");
    }
  });
})

afterAll(() => {
  mongoose.disconnect()
})

describe('Testing all the mail route', () => {


  // it('Returns status 400 if all required fields missing', async done => {
  //   await request.post('/mail/send')       
  //     expect(400);
  //     done();
  // });


  // it('Returns status 200 if all required fields completed ', async done => {
  //   await request.post('/mail/send')   
  //               .send({
  //                 first_name: "heng",
  //                 Last_name:"cai",
  //                 Email:"http://imagetest",
  //                 contact_number:"0284849",
  //                 subject:"check",
  //                 Message:"this is for test mail route"
  //               });
  //     expect(403);
  //     done();
  // });
 



  
  });











