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

exports.updateUserStatusByStudentUsername = (username, updateUserStatus) => {
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .updateOne({ username: username }, { $set: updateUserStatus })
      .then((student) => {
        return student;
      });
  });
};

exports.updateRanchByUsername = (username) => {
  const badges = [
    "https://i.imgur.com/x0cwPla.png",
    "https://i.imgur.com/EmMa4Gz.png",
    "https://i.imgur.com/yxlSmoL.png",
    "https://i.imgur.com/mM4LmUV.png",
    "https://i.imgur.com/J1q0Gue.png",
  ];
  let rewardNum = Math.floor(Math.random() * badges.length);
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .updateOne(
        { username: username },
        { $push: { jeoRanch: badges[rewardNum] } }
      )
      .then((result) => {
        return result;
      });
  });
};

exports.updateUserObj = (username, updateUserInfo) => {
  return database.run().then((database) => {
    return database
      .collection("usersDB")
      .updateOne(
        { username: username },
        {
          $set: {
            type: "student",
            userPoints: 0,
            avatarURL: ["https://i.imgur.com/T5IjKoI.png"],
            jeoRanch: [
              "https://i.imgur.com/oxYZ7c2.png",
              "https://i.imgur.com/T5IjKoI.png",
            ],
            userStatus: "Learning geography with jeography!",
          },
        }
      )
      .then((result) => {
        return result;
      });
  });
};
