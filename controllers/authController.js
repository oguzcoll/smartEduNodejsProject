const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(201).json({
      status: "fail",
      error,
    });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const same = bcrypt.compare(password, user.password);
      if (same) {
        // session
        req.session.userID = user._id;
        res.status(200).redirect("/");
      } else {
        res.status(401).send("Invalid password");
      }
    }
  } catch (error) {
    res.status(201).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
