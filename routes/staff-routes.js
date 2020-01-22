const express= require ('express');
const router = express.Router();
const {addStaff, staffs} = require('../controllers/staff');

router.post('/add_staff', addStaff)
router.get('/staff', staffs)


module.exports= router;


