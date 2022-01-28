const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");

//Route : 1 Create a user using POST : 'api/auth/createuser'. Doesn't require auth.
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atlest 5 characters").isLength({
      min: 5,
    }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    //if any error occur show error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      //check if your with same email exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, errors: [{msg : "Email Already Exists"}] });
      }
      //hasing the user's given password then sending data go MongoDB
      let password = await bcrypt.hash(req.body.password, 12);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      //generating token for user using JWT
      const authtoken = jwt.sign(data, `${process.env.SECRET_KEY}`);
      success = true;
      res.json({success, authtoken });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("An Error Occur");
    }
  }
);

//Route : 2 Create a user using POST : 'api/auth/login'. Doesn't require auth.
router.post(
  "/login",
  [
    body("password", "Password can't be blank").exists(),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    //if any error occur show error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //destruturing email & password from body
    const { email, password } = req.body;
    try {
      //checking if user's provided email exists in our DB.
      let user = await User.findOne({ email });
      // if email not exist's
      if (!user) {
        return res
          .status(400)
          .json({success, errors: [{msg : "Please login with correct credentials"}] });
      }

      //compareing passwords by the hashed password of DB.
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, errors: [{msg : "Please login with correct credentials"}] });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      //generating auth token
      const authtoken = jwt.sign(data, `${process.env.SECRET_KEY}`);
      success = true;
      res.json({success, authtoken });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("An Error Occur");
    }
  }
);

//Route 3 Getting  a user Data using POST : 'api/auth/getUser'. require auth.
router.post("/getuser", fetchUser, async (req, res) => {
  // destructuring email & password from body
  const { email, password } = req.body;
  try {
    userId = req.user.id;
    //getting user data
    let user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("An Error Occur");
  }
});

module.exports = router;
