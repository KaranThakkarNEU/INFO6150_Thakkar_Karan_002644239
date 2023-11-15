const userModel = require("../models/model");

const getUsersService = async () => {
  try {
    const users = await userModel.find();
    if (users.length) {
      return { message: "Users fetched successfully", users };
    } else {
      return { message: "No users found" };
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getUsersService;
