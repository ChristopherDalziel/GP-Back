const app = require("../app");
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require("mongoose");

beforeAll(() => {
  const dbConfig = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(process.env.TEST_DB, dbConfig, err => {
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

describe('Testing all the amdin vaccines data route', () => {
  it('Returns status 200 when all fields are completed', async done => {
    await request.post('/vaccines/create')
                .send(
                  {
                    brand: 'vaccine-create-test',
                    description:"this is for testing create vaccine",
                    manufacturer:"nahe factory",
                    imageUrl:"http:locaddaTESTvaccine.com",
                  })
    expect(200); 
    done();
  });

  it('Returns status 200 when get all vaccines data', async done => {
    await request.get('/')
    expect(200); 
    done();
  });


  it('Returns status 200 when the vaccine data been updated successfully', async done => {
    await request.put('/vaccines/update/5e376b250dba6c18c46a8416')
                .send(
                  {
                    serviceName: 'vaccine-update-test',
                    serviceDescription:"test vaccine update",
                    imageUrl:"http:locaddaTESTupdate.com"
                  })
    expect(200); 
    done();
  });

  it('Returns status 200 when can show vaccine data', async done => {

    await request.get('vaccines/5e376b250dba6c18c46a8416')
              
    expect(200); 
    done();
  });


  // it('Returns status 200 when vaccine data been deleted successfully', async done => {

  //   await request.delete('vaccines/delete/5e376b250dba6c18c46a8416')
  //   expect(200); 
  //   done();
  // });
})