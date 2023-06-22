"use strict";

var usersModel = require('../models/users.mongo');

var _require = require('./computeAvailableBalance.controller'),
    remainingBalance = _require.remainingBalance; ///////--------------------add product block scope starts here-------------------///////////


function addProduct(req, res) {
  var _req$body, userId, entryDate, serialNo, category, itemDescription, qty, buyPrice, sellPrice, user, profit, newProduct;

  return regeneratorRuntime.async(function addProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, entryDate = _req$body.entryDate, serialNo = _req$body.serialNo, category = _req$body.category, itemDescription = _req$body.itemDescription, qty = _req$body.qty, buyPrice = _req$body.buyPrice, sellPrice = _req$body.sellPrice;
          console.log(req.body);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(usersModel.findOne({
            userName: userId
          }));

        case 5:
          user = _context.sent;

          if (user) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 8:
          profit = (sellPrice - buyPrice) * qty;
          newProduct = {
            userId: userId,
            entryDate: entryDate,
            serialNo: serialNo,
            category: category,
            itemDescription: itemDescription,
            qty: qty,
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            profit: profit
          };
          user.productList.push(newProduct); ///// Add the new product to the user's productList array

          _context.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(remainingBalance());

        case 15:
          res.status(200).json({
            message: 'Item added successfully'
          });
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 18]]);
}

module.exports = {
  addProduct: addProduct
}; /////------------------------end of addPoduct block scope---------------------/////////