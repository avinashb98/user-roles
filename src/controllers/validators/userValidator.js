const Joi = require('joi');
const User = require('../../models/user');

const userWithIdExists = async (userId) => {
  let users;
  try {
    users = await User.findAll({ userId });
  } catch (error) {
    throw error;
  }

  if (users.length > 0) {
    return true;
  }
  return false;
};

const ValidateCreate = Joi.object().keys({
  userId: Joi.string().min(3).max(30).required()
});

const create = async (req, res, next) => {
  const { error, value } = ValidateCreate.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid User Id. ${error.message}`
    });
    return;
  }

  if (await userWithIdExists(value.userId)) {
    res.status(400).json({
      message: 'This user id is already registered with another user'
    });
    return;
  }

  req.parsed = value;
  next();
};

module.exports = { create };
