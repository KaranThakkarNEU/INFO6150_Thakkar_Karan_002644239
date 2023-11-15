const userModel = require("../models/model");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const passwordRegex = new RegExp(
  "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}"
);
const noSpecialCharOrNumRegex = "^[a-zA-Z ]+$";

async function updateUserService(data) {
  const { email, password, fullName } = data;

  try {
    // Find the user by ID and update them
    const user = await userModel.findOne({ email });
    if (!user) {
      return { message: "User not found" };
    }

    if (!fullName.length || !email.length || !password.length) {
      return { message: "All fields are required" };
    } else if (!password.match(passwordRegex)) {
      return {
        message:
          "Not a valid password, must contain 1 uppercase, 1 lowercase, 1 number, 1 special character and must be atleast 8 characters long",
      };
    } else if (!fullName.match(noSpecialCharOrNumRegex)) {
      return {
        message: "Not a valid name, must contain only alphabets",
      };
    }

    // encrypt password
    const hash = await bcrypt.hash(user.password, saltRounds);

    await userModel.updateOne(
      { email },
      { $set: { fullName, password: hash } }
    );

    return {
      message: "User details updated successfully",
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = updateUserService;
