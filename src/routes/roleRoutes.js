const express = require('express');
const roleController = require('../controllers/roleController');
const validate = require('../controllers/validators/roleValidator');

const router = express.Router();

router.post('/', validate.create, roleController.create);

module.exports = router;
