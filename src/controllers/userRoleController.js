const UserRole = require('../models/userRole');
const User = require('../models/user');

const assignRole = async (req, res) => {
  const { userId, role } = req.body;
  let roles;
  if (!Array.isArray(role)) {
    roles = [role];
  } else {
    roles = role;
  }

  const creations = [];
  roles.forEach((userRole) => {
    creations.push(UserRole.create({ userId, role: userRole }));
  });

  try {
    await Promise.all(creations);
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: `Role(s) assigned to User ${userId} successfully`,
    data: { userId, role }
  });
};

const usersByRole = async (req, res) => {
  const { role } = req.body;
  console.log(role);
  let rawUserIds;
  try {
    rawUserIds = await UserRole.findAll({ where: { role } });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  console.log(rawUserIds);

  if (rawUserIds.length === 0) {
    res.status(404).json({
      message: `No Users with role ${role} found`,
      data: {}
    });
    return;
  }

  const ids = [];
  rawUserIds.forEach((rawId) => {
    ids.push(rawId.dataValues.userId);
  });

  let users;
  try {
    users = await User.findAll({ where: { userId: ids } });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(200).json({
    message: `List of users with role ${role}`,
    data: { users }
  });
};

const removeRole = async (req, res) => {
  const { userId, role } = req.body;
  let roles;
  if (!Array.isArray(role)) {
    roles = [role];
  } else {
    roles = role;
  }

  const deletions = [];
  roles.forEach((userRole) => {
    deletions.push(UserRole.destroy({ where: { userId, role: userRole } }));
  });

  try {
    await Promise.all(deletions);
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: `Role(s) assigned to User ${userId} have been successfully removed`,
    data: {}
  });
};

module.exports = {
  assignRole,
  usersByRole,
  removeRole
};
