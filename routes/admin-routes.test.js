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

describe('Testing all the amdin staff route', () => {
  it('Returns status 200 when all fields are completed', async done => {
    await request.post('/admin/add_staff')
                .send(
                  {
                    name: 'heng-test',
                    position:"doctor",
                    aboutText: 'i am a doctor for test',
                    imageUrl:"http:locadda.com"
                  })
    expect(200); 
    done();
  });

  it('Returns status 200 when get all staff data', async done => {
    await request.get('/admin/staff')

    expect(200); 
    done();
  });

  it('Returns status 200 when the updated data been found ', async done => {
      // beforeAll(async () => {
      //   jest.setTimeout(20000);
      // })

      await request.put('/admin/edit_staff/5e33a75ebfc584512d19dd1e')        
      expect(200); 
      done();
  });

  it('Returns status 200 when data been updated successfully', async done => {

    // beforeAll(async () => {
    //   jest.setTimeout(20000);
    // })

    await request.put(`/admin/update_staff/5e33a75ebfc584512d19dd1e`)
                .send(
                  {
                    name: 'hneg-test-update',
                    position:"doctor-update",
                    aboutText: 'i am a doctor for test update',
                    imageUrl:"http:locaddaEDIT.com"
                  })
    expect(200); 
    done();
  });


  it('Returns status 200 when data been deleted successfully', async done => {

    // beforeAll(async () => {
    //   jest.setTimeout(20000);
    // })
    await request.delete('/admin/delete_staff/5e33a75ebfc584512d19dd1e')
    expect(200); 
    done();
  });
})