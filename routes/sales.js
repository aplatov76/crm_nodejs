const express = require('express');
const passport = require('passport');
const controllers = require('../controllers/sales');


const router = express.Router()

router.post('/today', passport.authenticate('jwt', { session: false}), controllers.getToday);

router.post('/add', passport.authenticate('jwt', { session: false}), controllers.add); 

//router.post('/', passport.authenticate('jwt', { session: false}), controllers.create);

module.exports = router;