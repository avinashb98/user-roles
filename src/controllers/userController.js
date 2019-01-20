const User = require('../models/user');

const create = async (req, res) => {
  const { userId } = req.body;
  let newUser;
  try {
    newUser = await User.create({ userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
  }

  res.status(201).json({
    message: 'User Successfully Created',
    data: { userId: newUser.userId }
  });
};

module.exports = {
  create
};
