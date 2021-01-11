const express = require('express');
const passport = require('passport');
const controllers = require('../controllers/prais');


const router = express.Router()

router.post('/all', passport.authenticate('jwt', { session: false}), controllers.getPrais);

router.post('/allproducts', passport.authenticate('jwt', { session: false}), controllers.getAllProducts);

router.post('/product', passport.authenticate('jwt', { session: false}), controllers.getById);

router.post('/save', passport.authenticate('jwt', {session: false}), controllers.save)

router.post('/groups', passport.authenticate('jwt', {session: false}), controllers.getGroups)

//router.post('/', passport.authenticate('jwt', { session: false}), controllers.create);

module.exports = router;