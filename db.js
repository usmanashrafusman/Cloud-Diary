const mongoose = require("mongoose");

// connecting to Mongo
const connetToMongo = () => {
  mongoose.connect(process.env.mongoURI, () => {
    console.log("Connected To Mongo Sucessfully");
  });
};

module.exports = connetToMongo;
