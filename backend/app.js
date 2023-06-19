// Déclaration et importation des dépendances
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
const URI = process.env.URI;

const app = express();
const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");
console.log(URI);
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Configurer les options CORS pour autoriser toutes les origines
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

// Activer CORS pour toutes les routes
app.use(cors(corsOptions));

// Ajoute un middleware pour analyser ces données et les rendre disponibles dans req.body
app.use(express.urlencoded({ extended: true }));

// Ajoute un middleware pour traiter les requêtes entrantes au format JSON
app.use(express.json());

// Définit une route pour gérer les requêtes liées aux livres de l'API
app.use("/api/books", bookRoutes);

// Définit une route pour gérer les requêtes d'authentification de l'API
app.use("/api/auth", userRoutes);

// Définit un middleware pour servir les fichiers statiques du répertoire "images" à partir de l'URL "/images"
app.use("/images", express.static(path.join(__dirname, "images")));
module.exports = app;
