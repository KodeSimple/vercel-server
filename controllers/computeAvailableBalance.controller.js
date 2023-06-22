const userModel = require('../models/users.mongo');

async function remainingBalance() {
  try {
    const users = await userModel.find();

    for (const user of users) {
      const sortedProducts = handleSortedProducts(user.productList);
      const soldItems = handleSoldItems(user.salesList);
      const remainingProducts = compareProducts(sortedProducts, soldItems);

      await userModel.findOneAndUpdate(
        { _id: user._id },
        { remainingProduct: remainingProducts },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function handleSortedProducts(productList) {
  const sortedProducts = [];

  for (const product of productList) {
    const existingProduct = sortedProducts.find((item) => item.serialNo === product.serialNo);

    if (existingProduct) {
      if (
        existingProduct.category !== product.category ||
        existingProduct.itemDescription !== product.itemDescription ||
        existingProduct.sellPrice !== product.sellPrice
      ) {
        existingProduct.category = product.category;
        existingProduct.itemDescription = product.itemDescription;
        existingProduct.sellPrice = product.sellPrice;
      }
      existingProduct.qty += product.qty;
    } else {
      sortedProducts.push({
        serialNo: product.serialNo,
        category: product.category,
        itemDescription: product.itemDescription,
        qty: product.qty,
        sellPrice: product.sellPrice,
        totalPrice: product.sellPrice * product.qty,
      });
    }
  }

  return sortedProducts;
}

function handleSoldItems(salesList) {
  const soldItems = [];

  for (const sale of salesList) {
    for (const item of sale.items) {
      const existingItem = soldItems.find((soldItem) => soldItem.serialNo === item.serialNo);

      if (existingItem) {
        existingItem.qty += item.qty;
      } else {
        soldItems.push({
          serialNo: item.serialNo,
          category: item.category,
          itemDescription: item.itemDescription,
          qty: item.qty,
          sellPrice: item.sellPrice,
          totalPrice: item.totalPrice,
        });
      }
    }
  }

  return soldItems;
}

function compareProducts(sortedProducts, soldItems) {
  const remainingProducts = [];

  for (const product of sortedProducts) {
    const soldItem = soldItems.find((item) => item.serialNo === product.serialNo);

    if (soldItem) {
      const remainingQty = product.qty - soldItem.qty;

      if (remainingQty > 0) {
        remainingProducts.push({
          serialNo: product.serialNo,
          category: product.category,
          itemDescription: product.itemDescription,
          qty: remainingQty,
          sellPrice: product.sellPrice,
          totalPrice: product.sellPrice * remainingQty,
        });
      }
    } else {
      remainingProducts.push({
        serialNo: product.serialNo,
        category: product.category,
        itemDescription: product.itemDescription,
        qty: product.qty,
        sellPrice: product.sellPrice,
        totalPrice: product.totalPrice,
      });
    }
  }

  return remainingProducts;
}

module.exports = { remainingBalance };


// const userModel = require('../models/users.mongo');

// async function remainingBalance() {
//   try {
//     const users = await userModel.find();

//     for (const user of users) {
//       const sortedProducts = handleSortedProducts(user.productList);
//       const soldItems = handleSoldItems(user.salesList);
//       const remainingProducts = compareProducts(sortedProducts, soldItems);

//       await userModel.findOneAndUpdate(
//         { _id: user._id },
//         { remainingProduct: remainingProducts },
//         { new: true }
//       );
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// function handleSortedProducts(productList) {
//   const sortedProducts = [];

//   for (const product of productList) {
//     const existingProduct = sortedProducts.find((item) => item.serialNo === product.serialNo);

//     if (existingProduct) {
//       existingProduct.qty += product.qty;
//     } else {
//       sortedProducts.push({
//         serialNo: product.serialNo,
//         category: product.category,
//         itemDescription: product.itemDescription,
//         qty: product.qty,
//         sellPrice: product.sellPrice,
//         totalPrice: product.sellPrice * product.qty,
//       });
//     }
//   }

//   return sortedProducts;
// }

// function handleSoldItems(salesList) {
//   const soldItems = [];

//   for (const sale of salesList) {
//     for (const item of sale.items) {
//       const existingItem = soldItems.find((soldItem) => soldItem.serialNo === item.serialNo);

//       if (existingItem) {
//         existingItem.qty += item.qty;
//       } else {
//         soldItems.push({
//           serialNo: item.serialNo,
//           category: item.category,
//           itemDescription: item.itemDescription,
//           qty: item.qty,
//           sellPrice: item.sellPrice,
//           totalPrice: item.totalPrice,
//         });
//       }
//     }
//   }

//   return soldItems;
// }

// function compareProducts(sortedProducts, soldItems) {
//   const remainingProducts = [];

//   for (const product of sortedProducts) {
//     const soldItem = soldItems.find((item) => item.serialNo === product.serialNo);

//     if (soldItem) {
//       const remainingQty = product.qty - soldItem.qty;

//       if (remainingQty > 0) {
//         remainingProducts.push({
//           serialNo: product.serialNo,
//           category: product.category,
//           itemDescription: product.itemDescription,
//           qty: remainingQty,
//           sellPrice: product.sellPrice,
//           totalPrice: product.sellPrice * remainingQty,
//         });
//       }
//     } else {
//       remainingProducts.push({
//         serialNo: product.serialNo,
//         category: product.category,
//         itemDescription: product.itemDescription,
//         qty: product.qty,
//         sellPrice: product.sellPrice,
//         totalPrice: product.totalPrice,
//       });
//     }
//   }

//   return remainingProducts;
// }

// module.exports = { remainingBalance };





