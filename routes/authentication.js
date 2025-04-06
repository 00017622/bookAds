const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const redirect = require('../middleware/redirectIfAuthenticated');

router.get('/register', redirect,  authenticationController.getRegister);

router.post('/register', redirect, authenticationController.postRegister);

router.get('/login', redirect, authenticationController.getLogin);

router.post('/login', redirect, authenticationController.postLogin);

router.get('/logout', authenticationController.logout);

module.exports = router;