const jwt = require("jsonwebtoken");

// middleware to get logged in user data
const fetchUser = (req, res, next) => {
  //getting JWT token from header
  const token = req.header("auth-token");
  if (!token) {
    //if token is not received
    res.status(401).send({ error: "Invalid Token" });
  }
  try {
    //verifying token with secrect key
    const data = jwt.verify(token, `${process.env.SECRET_KEY}`);
    req.user = data.user;
    next();
  } catch (error) {
    //on catch showing error
    res.status(401).send({ error: "Invalid Token" });
  }
};

module.exports = fetchUser;
