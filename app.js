const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const createUserRoute = require("./routes/createUser");
const deleteUserRoute = require("./routes/deleteUser");
const getUsersRoute = require("./routes/getUsers");
const updateUserRoute = require("./routes/updateUser");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/user/getAll", getUsersRoute);
app.use("/user/create", createUserRoute);
app.use("/user/edit", updateUserRoute);
app.use("/user/delete", deleteUserRoute);

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/", {
      dbName: "webdesign",
    });

    console.log("Database connected");

    app.listen(7000, () => {
      console.log("Server is running at port 7000");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

module.exports = app;
