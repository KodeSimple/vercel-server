"use strict";

var User = require('../models/users.mongo');

function salesReceipt(req, res) {
  var userName, user, lastSales, response;
  return regeneratorRuntime.async(function salesReceipt$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userName = req.body.userName;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            userName: userName
          }));

        case 4:
          user = _context.sent;

          if (!user) {
            res.status(404).json({
              error: 'User not found'
            });
          } else {
            lastSales = user.salesList[user.salesList.length - 1]; // Get the last object in salesList

            response = {
              businessName: user.businessName,
              userName: user.userName,
              salesList: [lastSales] // Wrap the last object in an array

            };
            res.json(response);
          }

          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}

module.exports = {
  salesReceipt: salesReceipt
};