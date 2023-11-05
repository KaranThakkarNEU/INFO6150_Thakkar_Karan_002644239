const express = require("express");
const userModel = require("../model");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const users = await userModel.find();
    if (users.length) {
      return response
        .status(200)
        .json({ message: "Users fetched successfully", users });
    } else {
      return response.status(200).json({ message: "No users found" });
    }
  } catch (error) {
    return response.status(500).json(error);
  }
});

module.exports = router;
