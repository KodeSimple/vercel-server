"use strict";

var userModel = require('../models/users.mongo'); // Handling the "/users/user-info" route


function GetUserInfo(req, res) {
  var reqUserName, user, businessName, firstName, lastName, userName, email, userInfo;
  return regeneratorRuntime.async(function GetUserInfo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          reqUserName = req.body.userName;
          console.log({
            userName: reqUserName
          });
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(userModel.findOne({
            userName: reqUserName
          }).exec());

        case 5:
          user = _context.sent;

          if (user) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));

        case 8:
          // Extract the required fields from the userModel
          businessName = user.businessName, firstName = user.firstName, lastName = user.lastName, userName = user.userName, email = user.email; // Construct the response object

          userInfo = {
            businessName: businessName,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email // password,

          }; // Send the response

          res.json(userInfo);
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](2);
          console.error(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: 'Server error'
          }));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 13]]);
}

module.exports = {
  GetUserInfo: GetUserInfo
};