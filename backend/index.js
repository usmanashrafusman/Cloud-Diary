const connetToMongo = require("./db");
const express = require("express");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
var cors = require('cors')
require("dotenv").config();


// connecting to mongo
connetToMongo();

const app = express();
const port = 5000;

app.use(cors())

//middleware to user JSON
app.use(express.json());

// middleware for all routes to api/auth
app.use("/api/auth", authRoutes);

// middleware for all routes to api/notes
app.use("/api/notes", notesRoutes);

// simple
app.get("/", (req, res) => {
  res.send("Hello Usman!");
});

//creating server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
