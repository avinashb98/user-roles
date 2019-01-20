const Sequelize = require('sequelize');
const db = require('../../config/db');

const Role = db.define('role', {
  role: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = Role;
