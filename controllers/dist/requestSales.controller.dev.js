"use strict";

///// ongoing add to cart sales function
var userModel = require('../models/users.mongo');

function requestSales(req, res) {
  var userName, user, temporaryProducts;
  return regeneratorRuntime.async(function requestSales$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userName = req.body.userName;

          if (userName) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid request body'
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(userModel.findOne({
            userName: userName
          }));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 9:
          temporaryProducts = user.temporaryProduct;
          res.status(200).json(temporaryProducts);
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

module.exports = {
  requestSales: requestSales
};