const usersModel = require('../models/users.mongo');
const bcrypt = require('bcrypt');

async function addUser(req, res) {
  const { businessName, firstName, lastName, userName, email, password, confirmPassword, productList, salesList, remainingProduct } = req.body;

  if (password !== confirmPassword) {
    return res.status(200).json({ status: false, errorName: 'confirmPassword', message: 'Password does not match' });
  }

  if (!email || !password || !firstName || !lastName) {
    return res.status(200).json({ status: false, errorName: 'validation', message: 'Invalid user data' });
  }

  const existingUser = await usersModel.findOne({ $or: [{ email: email }, { userName: userName }] });

  if (existingUser) {
    return res.status(200).json({ status: false, errorName: 'emailExist', message: 'Username or Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new usersModel({
    businessName,
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
    productList: productList || [],
    salesList: salesList || [],
    remainingProduct: remainingProduct || [],
  });

  await newUser.save();
  res.status(200).json({ status: true, message: 'User successfully registered' });
}

module.exports = { addUser };



// const usersModel = require('../models/users.mongo');
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