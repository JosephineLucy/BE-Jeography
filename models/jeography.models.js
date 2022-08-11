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
