const { selectUsers } = require("../models/jeography");

exports.getUsers = (request, response) => {
  selectUsers().then((users) => {
    response.status(200).send({ users });
  });
};
