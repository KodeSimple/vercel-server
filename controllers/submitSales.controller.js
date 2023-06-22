const userModel = require('../models/users.mongo');
const { remainingBalance } = require('./computeAvailableBalance.controller');

async function submitSales(req, res) {
  const { userName, salesList } = req.body;
  console.log({ userName, salesList });

  try {
    const user = await userModel.findOneAndUpdate(
      { userName },
      { $push: { salesList }, $set: { temporaryProduct: [] } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await remainingBalance(); ////// Compute new remaining balance here

    res.status(200).json({ message: 'Sales submitted successfully' });
  } catch (error) {
    console.error('Error submitting sales:', error);
    res.status(500).json({ message: 'Error submitting sales' });
  }
}

module.exports = { submitSales };



