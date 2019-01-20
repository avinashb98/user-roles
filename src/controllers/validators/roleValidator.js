const Joi = require('joi');
const Role = require('../../models/role');

const roleExists = async (role) => {
  let roles;
  try {
    roles = await Role.findAll({ where: { role } });
  } catch (error) {
    throw error;
  }

  if (roles.length > 0) {
    return true;
  }
  return false;
};

const ValidateCreate = Joi.object().keys({
  role: Joi.string().min(3).max(30).required()
});

const create = async (req, res, next) => {
  const { error, value } = ValidateCreate.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid Role. ${error.message}`
    });
    return;
  }

  if (await roleExists(value.role)) {
    res.status(400).json({
      message: 'This role already exists'
    });
    return;
  }

  req.parsed = value;
  next();
};

module.exports = { create };
