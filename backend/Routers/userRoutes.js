const express = require('express');
const router = express.Router();
const {
    login,
    signup,
    logout
} = require('../Controllers/userController.js');
const { authenticate } = require("../Services/authenticate.js");

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', authenticate, logout); // needs to be protected

module.exports = router;