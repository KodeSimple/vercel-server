const userModel = require('../models/users.mongo');

// Handling the "/users/user-info" route
async function GetUserInfo(req, res) {
  const { userName: reqUserName } = req.body;

  console.log({ userName: reqUserName });

  try {
    const user = await userModel.findOne({ userName: reqUserName }).exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the required fields from the userModel
    const { businessName, firstName, lastName, userName, email} = user;

    // Construct the response object
    const userInfo = {
      businessName,
      firstName,
      lastName,
      userName,
      email,
      // password,
    };

    // Send the response
    res.json(userInfo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { GetUserInfo };


