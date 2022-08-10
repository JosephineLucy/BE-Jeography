const { MongoClient } = require("mongodb");
const connectionString = "mongodb+srv://jeography:fn6ma8997ATcWLIa@cluster0.nrslrce.mongodb.net/test";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToServer = function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("jeography_test");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  };

const run = async () => {
    try {
        await client.connect();
        const db  = client.db("jeography_test");
        return db;
    } catch (err) {
        console.log("issue connecting")
    }
}



module.exports = {run, client, connectToServer}