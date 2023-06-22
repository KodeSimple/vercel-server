const usersModel = require('../models/users.mongo');


/////-----------------get available balance block scope starts here------------//////////
async function availableBalance(req, res) {
  try {
    const { userName } = req.body;
    const user = await usersModel.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const getAvailableProduct = user.remainingProduct;
    res.status(200).json(getAvailableProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
/////-----------------get available balance block scope ends here------------//////////

module.exports = {availableBalance};