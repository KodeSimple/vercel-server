
///// ongoing add to cart sales function
const userModel = require('../models/users.mongo');

async function requestSales(req, res) {
  try {
    const { userName } = req.body;

    if (!userName) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const user = await userModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const temporaryProducts = user.temporaryProduct;

    res.status(200).json(temporaryProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  requestSales,
};
