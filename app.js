// // Loads the configuration from config.env to process.env
// require("dotenv").config({ path: "./config.env" });

const express = require("express");
const { getUsers, getCountry } = require("./controllers/jeography");
const cors = require("cors");

// // get MongoDB driver connection
const dbo = require("./db/connection");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.json());

app.get("/users", getUsers);
app.get("/:country", getCountry)

// Global error handling
// app.use(function (err, _req, res) {
//   console.error(err.stack);
//   // res.status(500).send("Something broke!");
// });

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

module.exports = app;
