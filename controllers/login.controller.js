const bcrypt = require('bcrypt');
const usersModel = require('../models/users.mongo');

async function login(req, res) {
  const { userName, password } = req.body;

  try {
    const user = await usersModel.findOne({ userName: userName });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.status(200).json({
          status: true,
          message: 'Login successful',
          userName: user.userName,
        });
      } else {
        res.status(200).json({
          status: false,
          message: 'Login failed, wrong credentials',
        });
      }
    } else {
      res.status(200).json({
        status: false,
        message: 'Login failed, wrong credentials',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  login,
};


// const usersModel = require('../models/users.mongo');


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

