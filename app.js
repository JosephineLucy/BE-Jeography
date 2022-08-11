const express = require("express");
const { getUsers, getCountry, postStudent } = require("./controllers/jeography.controllers");
const cors = require("cors");
const dbo = require("./db/connection");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/users", getUsers);

app.get("/:country", getCountry);
app.post("/student", postStudent);

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

module.exports = app;
