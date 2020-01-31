const request = require('supertest')
const app = require('../../app')
require('dotenv').config();
exports.login = async () => {
  const response = await request(app)
   .post('/users/login')
   .send({
     email: 'cam021928@coderacademy.edu.au',
     password: 'testtest2'
   })
   return response.text
 }