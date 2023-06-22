"use strict";

var userModel = require('../models/users.mongo');

function remainingBalance() {
  var users, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, user, sortedProducts, soldItems, remainingProducts;

  return regeneratorRuntime.async(function remainingBalance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(userModel.find());

        case 3:
          users = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 7;
          _iterator = users[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 19;
            break;
          }

          user = _step.value;
          sortedProducts = handleSortedProducts(user.productList);
          soldItems = handleSoldItems(user.salesList);
          remainingProducts = compareProducts(sortedProducts, soldItems);
          _context.next = 16;
          return regeneratorRuntime.awrap(userModel.findOneAndUpdate({
            _id: user._id
          }, {
            remainingProduct: remainingProducts
          }, {
            "new": true
          }));

        case 16:
          _iteratorNormalCompletion = true;
          _context.next = 9;
          break;

        case 19:
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 25:
          _context.prev = 25;
          _context.prev = 26;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 28:
          _context.prev = 28;

          if (!_didIteratorError) {
            _context.next = 31;
            break;
          }

          throw _iteratorError;

        case 31:
          return _context.finish(28);

        case 32:
          return _context.finish(25);

        case 33:
          _context.next = 38;
          break;

        case 35:
          _context.prev = 35;
          _context.t1 = _context["catch"](0);
          console.log(_context.t1);

        case 38:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 35], [7, 21, 25, 33], [26,, 28, 32]]);
}

function handleSortedProducts(productList) {
  var sortedProducts = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var product = _step2.value;
      var existingProduct = sortedProducts.find(function (item) {
        return item.serialNo === product.serialNo;
      });

      if (existingProduct) {
        if (existingProduct.category !== product.category || existingProduct.itemDescription !== product.itemDescription || existingProduct.sellPrice !== product.sellPrice) {
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
          totalPrice: product.sellPrice * product.qty
        });
      }
    };

    for (var _iterator2 = productList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return sortedProducts;
}

function handleSoldItems(salesList) {
  var soldItems = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = salesList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var sale = _step3.value;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        var _loop2 = function _loop2() {
          var item = _step4.value;
          var existingItem = soldItems.find(function (soldItem) {
            return soldItem.serialNo === item.serialNo;
          });

          if (existingItem) {
            existingItem.qty += item.qty;
          } else {
            soldItems.push({
              serialNo: item.serialNo,
              category: item.category,
              itemDescription: item.itemDescription,
              qty: item.qty,
              sellPrice: item.sellPrice,
              totalPrice: item.totalPrice
            });
          }
        };

        for (var _iterator4 = sale.items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          _loop2();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return soldItems;
}

function compareProducts(sortedProducts, soldItems) {
  var remainingProducts = [];
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    var _loop3 = function _loop3() {
      var product = _step5.value;
      var soldItem = soldItems.find(function (item) {
        return item.serialNo === product.serialNo;
      });

      if (soldItem) {
        var remainingQty = product.qty - soldItem.qty;

        if (remainingQty > 0) {
          remainingProducts.push({
            serialNo: product.serialNo,
            category: product.category,
            itemDescription: product.itemDescription,
            qty: remainingQty,
            sellPrice: product.sellPrice,
            totalPrice: product.sellPrice * remainingQty
          });
        }
      } else {
        remainingProducts.push({
          serialNo: product.serialNo,
          category: product.category,
          itemDescription: product.itemDescription,
          qty: product.qty,
          sellPrice: product.sellPrice,
          totalPrice: product.totalPrice
        });
      }
    };

    for (var _iterator5 = sortedProducts[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      _loop3();
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return remainingProducts;
}

module.exports = {
  remainingBalance: remainingBalance
}; // const userModel = require('../models/users.mongo');
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