const {
  selectStudents,
  selectCountry,
  insertStudent,
  selectProfile,
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

exports.getProfile = (request, response) => {
  const username = request.params.username;
  selectProfile(username).then((profile) => {
    response.status(200).send({ profile });
  });
};
