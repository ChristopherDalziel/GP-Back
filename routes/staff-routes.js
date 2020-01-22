const express= require ('express');
const router = express.Router();
const {add_staff} = require('../controllers/staff');

router.post('/add_staff', add_staff)
// router.get('/staff', staffs)

module.exports= router;


