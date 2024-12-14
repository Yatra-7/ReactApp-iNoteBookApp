const express = require("express");
const { default: mongoose } = require("mongoose");
const { validationResult } = require("express-validator");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "harryisagood$boy";
const fetchuser= require('../middleware/fetchuser')

//ROUTE:1 create a user using : POST "/api/auth/createuser". doesnt require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],

  async (req, res) => {
    let success=false;

    //if error are there return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //check wheather the user with email exists already

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ success,authtoken });

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occur");
    }
  }
);

//ROUTE:2 Authenticate a user using : POST "/api/auth/login". doesnt require login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],async (req, res) => {

    let success=false;
    //if there ia an error , return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res
          .status(400)
          .json({ error: "please enter correct credentials" }); //6.11 50
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false
        return res
          .status(400)
          .json({ success ,error: "please enter correct credentials" }); //6.11 50
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;

      res.json({ success,authtoken });

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occur");
    }
  }
);


//ROUTE:3 get loggedin user detail using : POST "/api/auth/getuser", require login
router.post('/getuser', fetchuser, async (req,res) =>{
  try {
    userId=req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occur");
  }
} )



module.exports = router;
