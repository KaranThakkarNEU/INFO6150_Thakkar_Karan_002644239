const express = require("express");
const userModel = require("../model");
const router = express.Router();

router.delete("/", async (request, response) => {
  const { email } = request.body;

  try {
    // Find the user by ID and remove them
    const user = await userModel.findOneAndDelete({ email });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});

module.exports = router;
