const Sequelize = require('sequelize');
const db = require('../../config/db');

const UserRole = db.define('userRole', {
  userId: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  }
});

module.exports = UserRole;
