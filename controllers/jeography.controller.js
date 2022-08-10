const { selectUsers, insertStudent } = require("../models/jeography.model");

exports.getUsers = (request, response) => {
  selectUsers().then((users) => {
    response.status(200).send({ users });
  });
};

exports.postStudent = (request, response) => {
  const newStudent = request.body;
  insertStudent(newStudent).then((student) => {
    response.status(201).send({ student });
  });
};
