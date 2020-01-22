const express= require ('express');
const router = express.Router();
const {add_staff,update_staff,deleteStaff} = require('../controllers/staff');

router.post('/add_staff', add_staff)
router.put('/update_staff/:id', update_staff)
router.delete('/delete_staff/:id', deleteStaff)


module.exports= router;


