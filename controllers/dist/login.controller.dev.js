"use strict";

var bcrypt = require('bcrypt');

var usersModel = require('../models/users.mongo');

function login(req, res) {
  var _req$body, userName, password, user, passwordMatch;

  return regeneratorRuntime.async(function login$(_context) {
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
            _context.next = 12;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 8:
          passwordMatch = _context.sent;

          if (passwordMatch) {
            res.status(200).json({
              status: true,
              message: 'Login successful',
              userName: user.userName
            });
          } else {
            res.status(200).json({
              status: false,
              message: 'Login failed, wrong credentials'
            });
          }

          _context.next = 13;
          break;

        case 12:
          res.status(200).json({
            status: false,
            message: 'Login failed, wrong credentials'
          });

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

module.exports = {
  login: login
}; // const usersModel = require('../models/users.mongo');
// /////-------------------log in block scoope code starts here---------------------////////
// async function login(req, res) {
//   const { userName, password } = req.body;
//   try {
//     const user = await usersModel.findOne({ userName: userName, password: password });
//      console.log(user);
//     if (user) {
//       res.status(200).json({
//         status: true,
//         message: 'Login successful',
//         userName: user.userName,
//       });
//     } else {
//       res.status(200).json({
//         status: false,
//         message: 'Login failed, wrong credentials',
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
// /////-------------------log in block scoope code ends here---------------------////////
// module.exports = {
//   login,
// };