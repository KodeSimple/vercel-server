"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var User = require('../models/users.mongo');

var removeCart = function removeCart(req, res) {
  var _req$body, userName, temporaryProduct, user, userTemporaryProduct, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _ret;

  return regeneratorRuntime.async(function removeCart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userName = _req$body.userName, temporaryProduct = _req$body.temporaryProduct;
          console.log({
            userName: userName,
            temporaryProduct: temporaryProduct
          }); ///// Find the user by userName

          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            userName: userName
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
          userTemporaryProduct = user.temporaryProduct; ////// Process each item in the temporaryProduct array

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 12;

          _loop = function _loop() {
            var item = _step.value;
            ///// Find the matching item in the userTemporaryProduct array
            var matchingItemIndex = userTemporaryProduct.findIndex(function (userItem) {
              return userItem.serialNo === item.serialNo;
            });
            console.log(matchingItemIndex);

            if (matchingItemIndex === -1) {
              return {
                v: res.status(404).json({
                  message: "Item not found with serialNo: ".concat(item.serialNo)
                })
              };
            }

            var matchingItem = userTemporaryProduct[matchingItemIndex];

            if (matchingItem.qty < item.qty) {
              return {
                v: res.status(400).json({
                  message: "Insufficient quantity"
                })
              }; ///// return res.status(400).json({ message: `Insufficient quantity for item with serialNo: ${item.serialNo}` });
            } ///// Update the quantity and remove the item if the result is zero


            matchingItem.qty -= item.qty;

            if (matchingItem.qty === 0) {
              userTemporaryProduct.splice(matchingItemIndex, 1);
            }
          };

          _iterator = temporaryProduct[Symbol.iterator]();

        case 15:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 22;
            break;
          }

          _ret = _loop();

          if (!(_typeof(_ret) === "object")) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", _ret.v);

        case 19:
          _iteratorNormalCompletion = true;
          _context.next = 15;
          break;

        case 22:
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](12);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 28:
          _context.prev = 28;
          _context.prev = 29;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 31:
          _context.prev = 31;

          if (!_didIteratorError) {
            _context.next = 34;
            break;
          }

          throw _iteratorError;

        case 34:
          return _context.finish(31);

        case 35:
          return _context.finish(28);

        case 36:
          _context.next = 38;
          return regeneratorRuntime.awrap(user.save());

        case 38:
          return _context.abrupt("return", res.json({
            message: 'Items successfully removed'
          }));

        case 41:
          _context.prev = 41;
          _context.t1 = _context["catch"](0);
          console.error(_context.t1);
          return _context.abrupt("return", res.status(500).json({
            message: 'Remove failed'
          }));

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 41], [12, 24, 28, 36], [29,, 31, 35]]);
};

module.exports = {
  removeCart: removeCart
};