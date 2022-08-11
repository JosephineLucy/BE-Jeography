const {
  selectStudents,
  selectCountry,
  insertStudent,
  updateUserPointsByStudentUsername,
  selectProfile,
  selectComments,
} = require("../models/jeography.models");

exports.getStudents = (req, res) => {
  selectStudents().then((students) => {
    res.status(200).send({ students });
  });
};

exports.getCountry = (req, res) => {
  const country = req.params.country;
  selectCountry(country).then((selectedCountry) => {
    res.status(200).send({ selectedCountry });
  });
};

exports.postStudent = (request, response) => {
  const newStudent = request.body;
  insertStudent(newStudent).then((student) => {
    response.status(201).send({ student });
  });
};

exports.patchUserPointsByStudentUsername = (request, response) => {
  const { username } = request.params;
  const updatedPoints = request.body;
  updateUserPointsByStudentUsername(username, updatedPoints).then((student) => {
    response.status(200).send({ student });
  });
};

exports.getProfile = (request, response) => {
  const username = request.params.username;
  selectProfile(username).then((profile) => {
    response.status(200).send({ profile });
  });
};

exports.getComments = (request, response) => {
  const username = request.params.username;
  selectComments(username).then((comments) => {
    response.status(200).send({ comments });
  });
};
