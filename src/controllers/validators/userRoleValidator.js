const Joi = require('joi');
const Role = require('../../models/role');
const User = require('../../models/user');
const UserRole = require('../../models/userRole');

// const roleExists = (role) => {
//   let roles;
//   try {
//     roles = await Role.findAll({ role });
//   } catch (error) {
//     throw error;
//   }

//   if (roles.length > 0) {
//     return true;
//   }
//   return false;
// };

const ValidateAssign = Joi.object().keys({
  role: Joi.string().min(3).max(30).required(),
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

  const [existingRole, existingUser] = await Promise.all([
    Role.findOne({ where: { role: value.role } }),
    User.findOne({ where: { userId: value.userId } })
  ]);

  if (!existingRole || !existingUser) {
    res.status(404).json({
      message: 'User or Role does not exist',
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

module.exports = { assignRole };
