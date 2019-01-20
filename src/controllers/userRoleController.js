const UserRole = require('../models/userRole');

const assignRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    await UserRole.create({ userId, role });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
  }

  res.status(201).json({
    message: `Role ${role} assigned to User ${userId} successfully`,
    data: { userId, role }
  });
};

module.exports = {
  assignRole
};
