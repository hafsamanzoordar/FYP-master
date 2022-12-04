const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const janazaReq = require("../models/janazaReq");

const register = async (req, res) => {
  try {
    // Get user input
    const { username, email, password, phone, gender } = req.body;

    // Validate user input
    if (!(email && password && username && phone && gender)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      username,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      phone,
      gender
    });

    // Create token
    token = jwt.sign({ user_id: user._id, email }, process.env.secret);

    // return new user
    res.status(201).send("User Created");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

const login = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(password && email)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status == "Inactive") {
      // Create token

      const token = jwt.sign({ user_id: user._id, email }, process.env.secret, {
        expiresIn: "1w",
      });

      // user

      res.status(200).json({ token });
    }
    else {
        res.status(200).send("You have been made inactive due to no activity. Please contact us to make your account active again.");
    }
  }
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid Credentials");
  }
  // Our login logic ends here
};

module.exports = {
  register,
  login,
};
