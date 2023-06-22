const usersModel = require('../models/users.mongo');
const { remainingBalance } = require('./computeAvailableBalance.controller');

///////--------------------add product block scope starts here-------------------///////////
async function addProduct(req, res) {
  const { userId, entryDate, serialNo, category, itemDescription, qty, buyPrice, sellPrice } = req.body;
  console.log(req.body);
  try {
    const user = await usersModel.findOne({ userName: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profit = (sellPrice - buyPrice) * qty;
    const newProduct = {
      userId: userId,
      entryDate: entryDate,
      serialNo: serialNo,
      category: category,
      itemDescription: itemDescription,
      qty: qty,
      buyPrice: buyPrice,
      sellPrice: sellPrice,
      profit: profit,
    };

    user.productList.push(newProduct); ///// Add the new product to the user's productList array
    await user.save();
    await remainingBalance();
    res.status(200).json({ message: 'Item added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {addProduct};
/////------------------------end of addPoduct block scope---------------------/////////