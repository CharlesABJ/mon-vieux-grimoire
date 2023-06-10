const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcryptRounds = 10;
const jwtSecretKey = "RAPTOR4124_EHEKELF";

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error("Cette adresse mail est déjà utilisée");
      }

      bcrypt
        .hash(req.body.password, bcryptRounds)
        .then((hash) => {
          const user = new User({
            email: req.body.email,
            password: hash,
          });

          user
            .save()
            .then(() => {
              res.status(201).json({
                message: "Utilisateur créé",
              });
            })
            .catch((error) => {
              res.status(400).json({ error: error.message });
            });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Mot de passe ou nom d'utilisateur incorrect" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((password) => {
            if (!password) {
              res.status(401).json({
                message: "Mot de passe ou nom d'utilisateur incorrect",
              });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, jwtSecretKey, {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
