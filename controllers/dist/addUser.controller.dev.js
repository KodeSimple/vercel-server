"use strict";

var usersModel = require('../models/users.mongo');

var bcrypt = require('bcrypt');

function addUser(req, res) {
  var _req$body, businessName, firstName, lastName, userName, email, password, confirmPassword, productList, salesList, remainingProduct, existingUser, hashedPassword, newUser;

  return regeneratorRuntime.async(function addUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, businessName = _req$body.businessName, firstName = _req$body.firstName, lastName = _req$body.lastName, userName = _req$body.userName, email = _req$body.email, password = _req$body.password, confirmPassword = _req$body.confirmPassword, productList = _req$body.productList, salesList = _req$body.salesList, remainingProduct = _req$body.remainingProduct;

          if (!(password !== confirmPassword)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            status: false,
            errorName: 'confirmPassword',
            message: 'Password does not match'
          }));

        case 3:
          if (!(!email || !password || !firstName || !lastName)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            status: false,
            errorName: 'validation',
            message: 'Invalid user data'
          }));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(usersModel.findOne({
            $or: [{
              email: email
            }, {
              userName: userName
            }]
          }));

        case 7:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            status: false,
            errorName: 'emailExist',
            message: 'Username or Email already exists'
          }));

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 12:
          hashedPassword = _context.sent;
          newUser = new usersModel({
            businessName: businessName,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: hashedPassword,
            productList: productList || [],
            salesList: salesList || [],
            remainingProduct: remainingProduct || []
          });
          _context.next = 16;
          return regeneratorRuntime.awrap(newUser.save());

        case 16:
          res.status(200).json({
            status: true,
            message: 'User successfully registered'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  addUser: addUser
}; // const usersModel = require('../models/users.mongo');
// // const bcrypt = require('bcrypt');
// /////-----------------addNew user block scope starts here-------------------------------------//////////
// async function addUser(req, res) {
//   const { businessName, firstName, lastName, userName, email, password, confirmPassword, productList, salesList, remainingProduct } = req.body;
//   if (password !== confirmPassword) {
//     return res.status(200).json({ status: false, errorName: 'confirmPassword', message: 'Password does not match' });
//   }
//   if (!email || !password || !firstName || !lastName) {
//     return res.status(200).json({ status: false, errorName: 'validation', message: 'Invalid user data' });
//   }
//   const existingUser = await usersModel.findOne({ $or: [{ email: email }, { userName: userName }] });
//   if (existingUser) {
//     return res.status(200).json({ status: false, errorName: 'emailExist', message: 'Username or Email already exists' });
//   }
//   const newUser = new usersModel({
//     businessName,
//     firstName,
//     lastName,
//     userName,
//     email,
//     password,
//     confirmPassword,
//     productList: productList || [],
//     salesList: salesList || [],
//     remainingProduct: remainingProduct|| [],
//   });
//   // const hashedPassword = await bcrypt.hash(password, 10);
//   // user.password = hashedPassword;
//   await newUser.save();
//   res.status(200).json({ status: true, message: 'User successfully registered' });
// }
// module.exports = {addUser};
// //////-----------------------end of addUser block--------------------------------/////////