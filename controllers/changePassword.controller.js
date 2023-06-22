const bcrypt = require('bcrypt');
const usersModel = require('../models/users.mongo');

async function changePassword(req, res) {
  const { userName, password } = req.body;

  try {
    const user = await usersModel.findOne({ userName: userName });

    if (user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      res.send(`User ${userName}'s password has been updated`);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
}

module.exports = { changePassword };



// const usersModel = require('../models/users.mongo');


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