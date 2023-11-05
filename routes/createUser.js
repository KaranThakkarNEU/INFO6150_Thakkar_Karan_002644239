const express = require("express");
const userModel = require("../model");
const bcrypt = require("bcrypt");
const router = express.Router();

const saltRounds = 10;
const passwordRegex = new RegExp(
  "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}"
);
const emailIdRegex = "^[a-zA-Z0-9._]+@northeastern.edu$";
const noSpecialCharOrNumRegex = "^[a-zA-Z ]+$";

router.post("/", async (request, response) => {
  const user = new userModel(request.body);

  try {
    // check if user already exists
    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) {
      return response.status(400).json({
        message: "User already exists",
      });
    }

    // validations
    if (!user.fullName.length || !user.email.length || !user.password.length) {
      return response.status(400).json({ message: "All fields are required" });
    } else if (!user.email.match(emailIdRegex)) {
      return response.status(400).json({
        message: "Not a valid email, must end with @northeastern.edu",
      });
    } else if (!user.password.match(passwordRegex)) {
      return response.status(400).json({
        message:
          "Not a valid password, must contain 1 uppercase, 1 lowercase, 1 number, 1 special character and must be atleast 8 characters long",
      });
    } else if (!user.fullName.match(noSpecialCharOrNumRegex)) {
      return response.status(400).json({
        message: "Not a valid name, must contain only alphabets",
      });
    }

    // encrypt password
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;

    // save user
    await user.save();

    return response.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return response.status(500).json(error);
  }
});

module.exports = router;
