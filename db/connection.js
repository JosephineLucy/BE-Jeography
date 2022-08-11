const { MongoClient } = require("mongodb");
const ENV = process.env.NODE_ENV || "development"
require("dotenv").config({path: `${__dirname}/../.env.${ENV}`})

if (!process.env.ATLAS_URI) {
  throw new Error ("MONGODB not set")
}

const connectionString = process.env.ATLAS_URI;
const database = process.env.DB_NAME

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToServer = function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db(database);
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  };

const run = async () => {
    try {
        await client.connect();
        const db  = client.db(database);
        return db;
    } catch (err) {
        console.log("issue connecting")
    }
}



module.exports = {run, client, connectToServer}