const express = require("express");
const {
  getStudents,
  getCountry,
  postStudent,
  patchUserPointsByStudentUsername,
  getProfile,
  patchUserStatusByStudentUsername,
  patchRanchByUsername,
} = require("./controllers/jeography.controllers");
const cors = require("cors");
const dbo = require("./db/connection");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/students", getStudents);
app.get("/student/:username", getProfile);
app.get("/:country", getCountry);

app.post("/student", postStudent);

app.patch("/students/:username/userPoints", patchUserPointsByStudentUsername);
app.patch("/students/:username/userStatus", patchUserStatusByStudentUsername);
app.patch("/students/:username/ranch", patchRanchByUsername);


dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

module.exports = app;
