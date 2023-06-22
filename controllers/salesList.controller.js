const User = require('../models/users.mongo');

async function salesList(req, res) {
  const { userName } = req.body;

  try {
     console.log({ userName });
    const user = await User.findOne({ userName: userName });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const response = {
        userName: user.userName,
        salesList: user.salesList,
      };
      res.json(response);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  salesList,
};



