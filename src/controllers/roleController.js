const Role = require('../models/role');

const create = async (req, res) => {
  const { role } = req.body;
  try {
    await Role.create({ role });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
  }

  res.status(201).json({
    message: 'Role Successfully Created',
    data: { role }
  });
};

module.exports = {
  create
};
