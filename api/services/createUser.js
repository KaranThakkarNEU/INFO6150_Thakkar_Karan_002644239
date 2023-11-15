const userModel = require("../models/model");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const passwordRegex = new RegExp(
  "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}"
);
const emailIdRegex = "^[a-zA-Z0-9._]+@northeastern.edu$";
const noSpecialCharOrNumRegex = "^[a-zA-Z ]+$";

async function createUserSerivce(user) {
  try {
    // check if user already exists
    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // validations
    validateUser(user);

    // encrypt password
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;

    // save user
    await userModel.create(user);

    return { message: "User created successfully" };
  } catch (error) {
    throw error;
  }
}

function validateUser(user) {
  if (!user.fullName.length || !user.email.length || !user.password.length) {
    throw new Error("All fields are required");
  } else if (!user.email.match(emailIdRegex)) {
    throw new Error("Not a valid email, must end with @northeastern.edu");
  } else if (!user.password.match(passwordRegex)) {
    throw new Error(
      "Not a valid password, must contain 1 uppercase, 1 lowercase, 1 number, 1 special character, and must be at least 8 characters long"
    );
  } else if (!user.fullName.match(noSpecialCharOrNumRegex)) {
    throw new Error("Not a valid name, must contain only alphabets");
  }
}

module.exports = createUserSerivce;
