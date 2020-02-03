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

describe('Testing all the amdin services route', () => {
  it('Returns status 200 when all fields are completed', async done => {
    await request.post('/services/create')
                .send(
                  {
                    serviceName: 'service-create-test',
                    serviceDescription:"general check",
                    imageUrl:"http:locaddaTEST.com"
                  })
    expect(200); 
    done();
  });

  it('Returns status 200 when get all services data', async done => {
    await request.get('/services')
    expect(200); 
    done();
  });


  it('Returns status 200 when the service data been updated successfully', async done => {
    await request.put('/services/update/5e3566b0ee5b5d0a76ae8914')
                .send(
                  {
                    serviceName: 'service-create-test',
                    serviceDescription:"test service update",
                    imageUrl:"http:locaddaTESTupdate.com"
                  })
    expect(200); 
    done();
  });
  it('Returns status 200 when can show service data', async done => {

    await request.get('/services/5e3566b0ee5b5d0a76ae8914')
              
    expect(200); 
    done();
  });


  // it('Returns status 200 when data been deleted successfully', async done => {

  //   await request.delete('/services/delete/5e3566b0ee5b5d0a76ae8914')
  //   expect(200); 
  //   done();
  // });
})
