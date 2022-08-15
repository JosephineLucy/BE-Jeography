const {
  selectStudents,
  selectCountry,
  insertStudent,
  updateUserPointsByStudentUsername,
  selectProfile,
  updateUserStatusByStudentUsername,
  updateRanchByUsername,
  updateUserObj,
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

exports.patchUserStatusByStudentUsername = (request, response) => {
  const { username } = request.params;
  const updateUserStatus = request.body;
  updateUserStatusByStudentUsername(username, updateUserStatus).then(
    (student) => {
      response.status(200).send({ student });
    }
  );
};

exports.patchRanchByUsername = (request, response) => {
  const { username } = request.params;
  updateRanchByUsername(username).then((result) => {
    response.status(200).send({ result });
  });
};

exports.patchUserObj = (request, response) => {
  const { username } = request.params;
  const updateUserInfo = request.body;
  updateUserObj(username, updateUserInfo).then((result) => {
    response.status(200).send({ result });
  });
};
