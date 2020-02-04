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

  it('Returns status 200 when get all opening hour data', async done => {
    await request.get('/opening-hours/')
    expect(200); 
    done();
  });


  it('Returns status 200 when the opennning hour data been updated successfully', async done => {
    await request.put('/opening-hours/update')
                .send(
                  {
                    order: 'test-update-hour',
                    dayOfTheWeek:"opening hour update",
                    openingHours:"opening hour update2"
                  })
    expect(200); 
    done();
  });

  it('Returns status 200 when can show opening hour data', async done => {
    await request.get('/opening-hours/show')         
    expect(200); 
    done();
  });


})