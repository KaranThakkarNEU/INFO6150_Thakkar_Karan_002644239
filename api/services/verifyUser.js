const userModel = require("../models/model");
const bcrypt = require("bcrypt");

async function verifyUserService(data) {
  try {
    const users = await userModel.find({
      email: data.email,
    });

    if (users.length) {
      const result = await bcrypt.compare(data.password, users[0].password);
      if (result) {
        return { message: "User authenticated succesfully" };
      } else {
        console.log(result);
        return { message: "Incorrect Credentials" };
      }
    } else {
      return { message: "Incorrect Credentials" };
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = verifyUserService;
