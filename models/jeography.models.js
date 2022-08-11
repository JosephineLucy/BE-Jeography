const database = require("../db/connection");

exports.selectStudents = () => {
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .find({ type: "student" })
      .toArray()
      .then((students) => {
        console.log(students);
        return students;
      });
  });
};

exports.selectCountry = (country) => {
  return database.run().then((database) => {
    return database
      .collection(country)
      .find({})
      .toArray()
      .then((country) => {
        return country;
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
