const userModel = require('../models/users.mongo');

async function getProductListBySerial(req, res) {
  try {
    const { userName, remainingProduct } = req.body;

    if (!userName || !remainingProduct || !Array.isArray(remainingProduct) || remainingProduct.length === 0) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const validatedQuantities = []; ///// Array to store all validated quantities

    const user = await userModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    for (const { serialNo, qty } of remainingProduct) {
      const product = user.remainingProduct.find((item) => item.serialNo === serialNo);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const { category, itemDescription, qty: availableQty, sellPrice } = product;

      ///// quantity and sellPrice as numbers
      const qtyAsNumber = parseInt(qty, 10);
      const sellPriceAsNumber = parseFloat(sellPrice);

      ///// Compute the total price
      const totalPrice = qtyAsNumber * sellPriceAsNumber;

      ///// Check quantity for the same serial number if exceeds the available quantity
      const validatedQty = user.temporaryProduct.reduce((totalQty, tempQty) => {
        if (tempQty.serialNo === serialNo) {
          return totalQty + parseInt(tempQty.qty, 10);
        }
        return totalQty;
      }, 0);

      const updatedQty = validatedQty + qtyAsNumber;

      if (updatedQty > availableQty) {
        return res.status(400).json({ message: 'Insufficient quantity' });
      }

      const remainingQty = availableQty - updatedQty;

      if (remainingQty < 0) {
        return res.status(400).json({ message: 'Insufficient quantity' });
      }

      ///////// save the validated quantity and totalPrice to temporaryProduct array as cart items
      const existingIndex = user.temporaryProduct.findIndex((tempQty) => tempQty.serialNo === serialNo);
      if (existingIndex !== -1) {
        user.temporaryProduct[existingIndex].qty += qtyAsNumber;
        user.temporaryProduct[existingIndex].totalPrice += totalPrice;
      } else {
        user.temporaryProduct.push({
          userName,
          serialNo,
          category,
          itemDescription,
          qty: qtyAsNumber,
          sellPrice: sellPriceAsNumber.toFixed(2),
          totalPrice,
        });
      }

      // Push the validated quantity and totalPrice to validatedQuantities array
      validatedQuantities.push({
        userName,
        serialNo,
        category,
        itemDescription,
        qty: qtyAsNumber,
        sellPrice: sellPriceAsNumber.toFixed(2),
        totalPrice,
      });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json(validatedQuantities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getProductListBySerial };

















