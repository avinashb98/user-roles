const express = require('express');
const userRoleController = require('../controllers/userRoleController');
const validate = require('../controllers/validators/userRoleValidator');

const router = express.Router();

router.post('/assign', validate.assignRole, userRoleController.assignRole);
router.get('/users-by-role', userRoleController.usersByRole);

module.exports = router;
