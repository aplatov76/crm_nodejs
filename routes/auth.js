const express = require('express');
const controllers = require('../controllers/auth')

const router = express.Router()
// api/auth/login
router.post('/login', controllers.login);

//router.get('/user', controllers.user);
// api/auth/register
router.post('/registration', controllers.register);

module.exports = router;