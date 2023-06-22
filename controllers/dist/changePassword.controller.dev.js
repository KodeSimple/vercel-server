"use strict";

var bcrypt = require('bcrypt');

var usersModel = require('../models/users.mongo');

function changePassword(req, res) {
  var _req$body, userName, password, user, hashedPassword;

  return regeneratorRuntime.async(function changePassword$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, userName = _req$body.userName, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(usersModel.findOne({
            userName: userName
          }));

        case 4:
          user = _context.sent;

          if (!user) {
            _context.next = 15;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 8:
          hashedPassword = _context.sent;
          user.password = hashedPassword;
          _context.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.send("User ".concat(userName, "'s password has been updated"));
          _context.next = 16;
          break;

        case 15:
          res.status(404).send('User not found');

        case 16:
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context.t0
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
}

module.exports = {
  changePassword: changePassword
}; // const usersModel = require('../models/users.mongo');
// /////-----------------change password user block scope starts here------------//////////
// async function changePassword(req, res) {
//   const { userName, password } = req.body;
//   try {
//     const user = await usersModel.findOne({ userName: userName });
//     if (user) {
//       user.password = password;
//       await user.save();
//       res.send(`User ${userName}'s password has been updated`);
//     } else {
//       res.status(404).send('User not found');
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
// module.exports = {changePassword};
// /////-----------------change password user block scope ends here------------//////////