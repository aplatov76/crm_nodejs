const express = require('express');
const passport = require('passport');
const controllers = require('../controllers/orders');

const router = express.Router()

router.post('/all', passport.authenticate('jwt', { session: false}), controllers.getAll);
router.post('/id', passport.authenticate('jwt', { session: false}), controllers.getById);
router.post('/add', passport.authenticate('jwt', { session: false}), controllers.add); 

module.exports = router;