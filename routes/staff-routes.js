const express = require("express");
const router = express.Router();

const { addStaff, staffs } = require("../controllers/staff");
const {add_staff} = require('../controllers/staff');
router.post('/add_staff', add_staff)
router.put('/update_staff/:id', update_staff)
router.delete('/delete_staff/:id', deleteStaff)


module.exports= router;



