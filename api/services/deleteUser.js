const userModel = require("../models/model");

const deleteUserByEmailService = async (email) => {
  // Find the user by email and remove them
  return await userModel.findOneAndDelete({ email });
};

module.exports = deleteUserByEmailService;
