const usersModel = require('../models/users.mongo');


/////-----------------get all users block scope starts here------------//////////
async function getAllUsers(req, res) {
    try {
      const allUsers = await usersModel.find();
      res.status(200).json(allUsers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  /////-----------------get all users block scope ends here------------//////////

  module.exports = {getAllUsers};