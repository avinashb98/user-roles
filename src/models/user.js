const Sequelize = require('sequelize');
const db = require('../../config/db');

const User = db.define('user', {
  userId: Sequelize.STRING
});

module.exports = User;
