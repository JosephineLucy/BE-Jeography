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
      .limit(5)
      .toArray()
      .then((country) => {
        return country;
      });
  });
};

exports.insertStudent = (newStudent) => {
  const { username, password, email } = newStudent;
  newStudent.type = "student";
  newStudent.userPoints = 0;
  newStudent.avatar_id = [""];
  newStudent.jeoRanch = ["https://i.imgur.com/mM4LmUV.png"];
  newStudent.userStatus = "Learning geography with jeography!";
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .insertOne(newStudent)
      .then((student) => {
        return student;
      });
  });
};
