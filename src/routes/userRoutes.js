const express = require('express');
const userController = require('../controllers/userController');
const validate = require('../controllers/validators/userValidator');

const router = express.Router();

router.post('/', validate.create, userController.create);

module.exports = router;
