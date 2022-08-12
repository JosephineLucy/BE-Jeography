const {
  selectStudents,
  selectCountry,
  insertStudent,
  updateUserPointsByStudentUsername,
  selectProfile,
  selectComments,
  updateUserStatusByStudentUsername,
  updateRanchByUsername,
  updateAvatarByUsername,
  insertComment
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

exports.patchUserStatusByStudentUsername = (request, response) => {
  const { username } = request.params;
  const updateUserStatus = request.body;
  updateUserStatusByStudentUsername(username, updateUserStatus).then(
    (student) => {
      response.status(200).send({ student });
  });
};

exports.patchRanchByUsername = (request, response) => {
  const { username } = request.params;
  updateRanchByUsername(username).then((result) => {
    response.status(200).send({ result });
  });
};

exports.patchAvatarByUsername = async (request, response) => {
  try {
    const { username } = request.params;
    const selectedAvatar = request.body.avatarURL;
    const student = await updateAvatarByUsername(username, selectedAvatar);
    response.status(200).send({ student });
  } catch (err) {
    console.log(err);
  }
};

exports.postComment = (req, res) => {
  const { username } = req.params;
  const newComment = req.body.body;
  insertComment(newComment, username).then((comment) => {
    res.status(201).send({ comment });
  });
}
