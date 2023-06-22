"use strict";

var userModel = require('../models/users.mongo');

var _require = require('./computeAvailableBalance.controller'),
    remainingBalance = _require.remainingBalance;

function submitSales(req, res) {
  var _req$body, userName, salesList, user;

  return regeneratorRuntime.async(function submitSales$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, userName = _req$body.userName, salesList = _req$body.salesList;
          console.log({
            userName: userName,
            salesList: salesList
          });
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(userModel.findOneAndUpdate({
            userName: userName
          }, {
            $push: {
              salesList: salesList
            },
            $set: {
              temporaryProduct: []
            }
          }, {
            "new": true
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
          _context.next = 10;
          return regeneratorRuntime.awrap(remainingBalance());

        case 10:
          ////// Compute new remaining balance here
          res.status(200).json({
            message: 'Sales submitted successfully'
          });
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](2);
          console.error('Error submitting sales:', _context.t0);
          res.status(500).json({
            message: 'Error submitting sales'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 13]]);
}

module.exports = {
  submitSales: submitSales
};