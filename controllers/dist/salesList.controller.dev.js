"use strict";

var User = require('../models/users.mongo');

function salesList(req, res) {
  var userName, user, response;
  return regeneratorRuntime.async(function salesList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userName = req.body.userName;
          _context.prev = 1;
          console.log({
            userName: userName
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            userName: userName
          }));

        case 5:
          user = _context.sent;

          if (!user) {
            res.status(404).json({
              error: 'User not found'
            });
          } else {
            response = {
              userName: user.userName,
              salesList: user.salesList
            };
            res.json(response);
          }

          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
}

module.exports = {
  salesList: salesList
};