const express = require("express");
const {
  getStudents,
  getCountry,
  postStudent,
  patchUserPointsByStudentUsername,
} = require("./controllers/jeography.controllers");
const cors = require("cors");
const dbo = require("./db/connection");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/students", getStudents);

app.get("/:country", getCountry);
app.post("/student", postStudent);
app.patch("/students/:username/userPoints", patchUserPointsByStudentUsername);

dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

module.exports = app;
