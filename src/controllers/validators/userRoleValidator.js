const Joi = require('joi');
const UserRole = require('../../models/userRole');

const ValidateAssign = Joi.object().keys({
  role: Joi.required(),
  userId: Joi.string().min(3).max(30).required()
});

const assignRole = async (req, res, next) => {
  const { error, value } = ValidateAssign.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid Role or UserId. ${error.message}`,
      data: {}
    });
    return;
  }

  const existingUserRole = await UserRole.findOne({
    where: { userId: value.userId, role: value.role },
    data: {}
  });

  if (existingUserRole) {
    res.status(400).json({
      message: 'User with Role already exists',
      data: {}
    });
    return;
  }

  req.parsed = value;
  next();
};

const ValidateRemove = Joi.object().keys({
  role: Joi.required(),
  userId: Joi.string().min(3).max(30).required()
});

const removeRole = async (req, res, next) => {
  const { error, value } = ValidateRemove.validate(req.body);
  if (error) {
    res.status(400).json({
      message: `Invalid Role or UserId. ${error.message}`,
      data: {}
    });
    return;
  }

  const existingUserRole = await UserRole.findOne({
    where: { userId: value.userId, role: value.role },
    data: {}
  });

  if (!existingUserRole) {
    res.status(400).json({
      message: 'User with Role does not exist',
      data: {}
    });
    return;
  }

  req.parsed = value;
  next();
};

module.exports = { assignRole, removeRole };
