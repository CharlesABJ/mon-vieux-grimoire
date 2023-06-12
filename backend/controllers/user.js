// Déclaration et importation des dépendances
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// require("dotenv").config();
// const jwtSecretKey = process.env.jwtSecretKey;

const bcryptRounds = 10;
const jwtSecretKey = "RAPTOR4124_EHEKELF";

exports.signup = (req, res, next) => {
  const { password } = req.body;
  User.findOne({ email: req.body.email }) // On cherche dans User un utilisateur ayant l'adresse e-mail spécifiée dans le body de la requête
    .then((existingUser) => {
      if (existingUser) {
        throw new Error("Cette adresse mail est déjà utilisée");
      }
      bcrypt
        .hash(req.body.password, bcryptRounds) //On hash le password
        .then((hash) => {
          const user = new User({
            email: req.body.email,
            password: hash,
          });
          // Vérification de la longueur minimale du mot de passe
          if (password.length < 4) {
            return res.status(400).json({
              message: "Le mot de passe doit comporter au moins 4 caractères.",
            });
          }
          user
            .save()
            .then(() => {
              res.status(201).json({
                message: "Utilisateur créé",
              });
            })
            .catch((error) => {
              res.status(400).json({ error });
            });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // On cherche dans User un utilisateur ayant l'adresse e-mail spécifiée dans le body de la requête
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
