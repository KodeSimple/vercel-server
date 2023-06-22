const User = require('../models/users.mongo');

async function salesReceipt(req, res) {
  const { userName } = req.body;

  try {
    const user = await User.findOne({ userName: userName });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const lastSales = user.salesList[user.salesList.length - 1]; // Get the last object in salesList
      const response = {
        businessName: user.businessName,
        userName: user.userName,
        salesList: [lastSales], // Wrap the last object in an array
      };
      res.json(response);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  salesReceipt,
};
