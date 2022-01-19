const mongoose = require("mongoose");

// mongoURI
const mongoURI =
  "mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

// connecting to Mongo
const connetToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected To Mongo Sucessfully");
  });
};

module.exports = connetToMongo;
