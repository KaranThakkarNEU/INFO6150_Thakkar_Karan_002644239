const express = require("express");
const userModel = require("../model");
const bcrypt = require("bcrypt");
const router = express.Router();

const saltRounds = 10;
const passwordRegex = new RegExp(
  "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{8,}"
);
const noSpecialCharOrNumRegex = "^[a-zA-Z ]+$";

router.put("/", async (request, response) => {
  const { email, password, fullName } = request.body;

  try {
    // Find the user by ID and update them
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    if (!fullName.length || !email.length || !password.length) {
      return response.status(400).json({ message: "All fields are required" });
    } else if (!password.match(passwordRegex)) {
      return response.status(400).json({
        message:
          "Not a valid password, must contain 1 uppercase, 1 lowercase, 1 number, 1 special character and must be atleast 8 characters long",
      });
    } else if (!fullName.match(noSpecialCharOrNumRegex)) {
      return response.status(400).json({
        message: "Not a valid name, must contain only alphabets",
      });
    }

    // encrypt password
    const hash = await bcrypt.hash(user.password, saltRounds);

    await userModel.updateOne(
      { email },
      { $set: { fullName, password: hash } }
    );

    return response.status(400).json({
      message: "User details updated successfully",
    });
  } catch (error) {
    return response.status(500).json(error);
  }
});

module.exports = router;
