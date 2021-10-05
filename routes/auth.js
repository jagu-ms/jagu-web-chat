const express = require('express');

const router = express.Router();

const controller = require('../controllers.js/authController');

router.post('/', controller.login);
router.post('/register', controller.register);

module.exports = router;