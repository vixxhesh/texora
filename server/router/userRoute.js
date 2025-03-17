const {userDetails} = require('../controllers/userController');
const express = require('express');
const router = express.Router();


router.post('/password',userDetails);

module.exports = router;



