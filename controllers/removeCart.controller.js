const User = require('../models/users.mongo');

const removeCart = async (req, res) => {
  try {
    const { userName, temporaryProduct } = req.body;
    console.log({ userName, temporaryProduct });
    ///// Find the user by userName
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { temporaryProduct: userTemporaryProduct } = user;
    

    ////// Process each item in the temporaryProduct array
    for (const item of temporaryProduct) {
      ///// Find the matching item in the userTemporaryProduct array
      const matchingItemIndex = userTemporaryProduct.findIndex(
        (userItem) => userItem.serialNo === item.serialNo
      );
      console.log(matchingItemIndex);

      if (matchingItemIndex === -1) {
        return res.status(404).json({ message: `Item not found with serialNo: ${item.serialNo}` });
      }

      const matchingItem = userTemporaryProduct[matchingItemIndex];

      if (matchingItem.qty < item.qty) {
        return res.status(400).json({ message: `Insufficient quantity` });
        ///// return res.status(400).json({ message: `Insufficient quantity for item with serialNo: ${item.serialNo}` });
      }

      ///// Update the quantity and remove the item if the result is zero
      matchingItem.qty -= item.qty;
      if (matchingItem.qty === 0) {
        userTemporaryProduct.splice(matchingItemIndex, 1);
      }
    }

    ///// Save the updated user document
    await user.save();

    return res.json({ message: 'Items successfully removed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Remove failed' });
  }
};

module.exports = {
  removeCart,
};


