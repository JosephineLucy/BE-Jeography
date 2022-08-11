const database = require("../db/connection");

exports.selectStudents = () => {
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .find({ type: "student" })
      .toArray()
      .then((students) => {
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
  newStudent.avatarURL = ["https://i.imgur.com/T5IjKoI.png"];
  newStudent.jeoRanch = [
    "https://i.imgur.com/oxYZ7c2.png",
    "https://i.imgur.com/T5IjKoI.png",
  ];
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

exports.updateUserPointsByStudentUsername = (username, updatedPoints) => {
  const { userPoints } = updatedPoints;
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .updateOne({ username: username }, { $inc: { userPoints: userPoints } })

      .then((student) => {
        return student;
      });
  });
};

exports.selectProfile = (username) => {
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .find({ username: username })
      .toArray()
      .then((profile) => {
        return profile;
      });
  });
};

exports.selectComments = (username) => {
  return database.run().then((database) => {
    return database
      .collection("comments")
      .find({ username: username })
      .toArray()
      .then((comments) => {
        console.log(comments, "<<<<<commments");
        return comments;
      });
  });
};
