const express = require("express");
const router = express.Router();
const verifyUser = require("../controllers/verifyUser");

router.post("/", verifyUser);

module.exports = router;
