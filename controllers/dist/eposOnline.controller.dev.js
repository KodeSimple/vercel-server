"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var userModel = require('../models/users.mongo');

function getProductListBySerial(req, res) {
  var _req$body, userName, remainingProduct, validatedQuantities, user, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret;

  return regeneratorRuntime.async(function getProductListBySerial$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userName = _req$body.userName, remainingProduct = _req$body.remainingProduct;

          if (!(!userName || !remainingProduct || !Array.isArray(remainingProduct) || remainingProduct.length === 0)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid request body'
          }));

        case 4:
          validatedQuantities = []; ///// Array to store all validated quantities

          _context.next = 7;
          return regeneratorRuntime.awrap(userModel.findOne({
            userName: userName
          }));

        case 7:
          user = _context.sent;

          if (user) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 10:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 13;

          _loop = function _loop() {
            var _step$value = _step.value,
                serialNo = _step$value.serialNo,
                qty = _step$value.qty;
            var product = user.remainingProduct.find(function (item) {
              return item.serialNo === serialNo;
            });

            if (!product) {
              return {
                v: res.status(404).json({
                  message: 'Product not found'
                })
              };
            }

            var category = product.category,
                itemDescription = product.itemDescription,
                availableQty = product.qty,
                sellPrice = product.sellPrice; ///// quantity and sellPrice as numbers

            var qtyAsNumber = parseInt(qty, 10);
            var sellPriceAsNumber = parseFloat(sellPrice); ///// Compute the total price

            var totalPrice = qtyAsNumber * sellPriceAsNumber; ///// Check quantity for the same serial number if exceeds the available quantity

            var validatedQty = user.temporaryProduct.reduce(function (totalQty, tempQty) {
              if (tempQty.serialNo === serialNo) {
                return totalQty + parseInt(tempQty.qty, 10);
              }

              return totalQty;
            }, 0);
            var updatedQty = validatedQty + qtyAsNumber;

            if (updatedQty > availableQty) {
              return {
                v: res.status(400).json({
                  message: 'Insufficient quantity'
                })
              };
            }

            var remainingQty = availableQty - updatedQty;

            if (remainingQty < 0) {
              return {
                v: res.status(400).json({
                  message: 'Insufficient quantity'
                })
              };
            } ///////// save the validated quantity and totalPrice to temporaryProduct array as cart items


            var existingIndex = user.temporaryProduct.findIndex(function (tempQty) {
              return tempQty.serialNo === serialNo;
            });

            if (existingIndex !== -1) {
              user.temporaryProduct[existingIndex].qty += qtyAsNumber;
              user.temporaryProduct[existingIndex].totalPrice += totalPrice;
            } else {
              user.temporaryProduct.push({
                userName: userName,
                serialNo: serialNo,
                category: category,
                itemDescription: itemDescription,
                qty: qtyAsNumber,
                sellPrice: sellPriceAsNumber.toFixed(2),
                totalPrice: totalPrice
              });
            } // Push the validated quantity and totalPrice to validatedQuantities array


            validatedQuantities.push({
              userName: userName,
              serialNo: serialNo,
              category: category,
              itemDescription: itemDescription,
              qty: qtyAsNumber,
              sellPrice: sellPriceAsNumber.toFixed(2),
              totalPrice: totalPrice
            });
          };

          _iterator = remainingProduct[Symbol.iterator]();

        case 16:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 23;
            break;
          }

          _ret = _loop();

          if (!(_typeof(_ret) === "object")) {
            _context.next = 20;
            break;
          }

          return _context.abrupt("return", _ret.v);

        case 20:
          _iteratorNormalCompletion = true;
          _context.next = 16;
          break;

        case 23:
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](13);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 29:
          _context.prev = 29;
          _context.prev = 30;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 32:
          _context.prev = 32;

          if (!_didIteratorError) {
            _context.next = 35;
            break;
          }

          throw _iteratorError;

        case 35:
          return _context.finish(32);

        case 36:
          return _context.finish(29);

        case 37:
          _context.next = 39;
          return regeneratorRuntime.awrap(user.save());

        case 39:
          res.status(200).json(validatedQuantities);
          _context.next = 46;
          break;

        case 42:
          _context.prev = 42;
          _context.t1 = _context["catch"](0);
          console.log(_context.t1);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 46:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 42], [13, 25, 29, 37], [30,, 32, 36]]);
}

module.exports = {
  getProductListBySerial: getProductListBySerial
};