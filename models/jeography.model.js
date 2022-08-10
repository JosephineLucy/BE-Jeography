const database = require("../db/connection");

exports.selectUsers = () => {
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .find({ type: "student" })
      .toArray()
      .then((users) => {
        return users;
      });
  });
};

exports.insertStudent = (newStudent) => {
  const { type, username, password, email, avatar_id } = newStudent;
  newStudent.userPoints = 0;
  newStudent.jeoRanch = [];
  newStudent.userStatus = "";
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .insertOne(newStudent)
      .then((student) => {
        return student;
      });
  });
};
