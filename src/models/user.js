const Sequelize = require('sequelize');
const db = require('../../config/db');

const User = db.define('user', {
  userId: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = User;
