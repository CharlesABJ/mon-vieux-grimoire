// Déclaration et importation des dépendances
const express = require("express");
const auth = require("../middleware/auth");
const stuffCtrl = require("../controllers/stuff");
const multer = require("../middleware/multer-config");
const router = express.Router();

// Mise en place de la configuration des routes

// Route pour créer un nouveau livre
router.post("/", auth, multer, stuffCtrl.postOneBook);

// Route pour ajouter une évaluation à un livre
router.post("/:id/rating", auth, multer, stuffCtrl.postRating);

// Route pour mettre à jour les informations d'un livre existant
router.put("/:id", auth, multer, stuffCtrl.putOneBook);

// Route pour supprimer un livre existant
router.delete("/:id", auth, multer, stuffCtrl.deleteOneBook);

// Route pour obtenir les livres avec les meilleures évaluations
router.get("/bestrating", stuffCtrl.getBestRating);

// Route pour obtenir les informations d'un livre spécifique
router.get("/:id", stuffCtrl.getOneBook);

// Route pour obtenir tous les livres
router.get("/", stuffCtrl.getAllBooks);

module.exports = router;
