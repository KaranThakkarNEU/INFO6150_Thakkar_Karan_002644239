const express = require("express");
const router = express.Router();
const deleteUser = require("../controllers/deleteUser");

router.delete("/", deleteUser);

module.exports = router;
