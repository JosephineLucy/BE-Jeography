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
