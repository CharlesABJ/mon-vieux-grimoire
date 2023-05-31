const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save().then(()).catch();
    })
    .catch((error) => res.status(500).json({ error }));
};

// exports.login = (req, res, next) => {};
