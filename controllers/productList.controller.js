const usersModel = require('../models/users.mongo');


/////-----------------get productList block scope starts here------------//////////
async function productList(req, res) {
  try {
    const { userName } = req.body;
    const user = await usersModel.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const productList = user.productList;
    res.status(200).json(productList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
/////-----------------productList users block scope ends here------------//////////

module.exports = {productList};