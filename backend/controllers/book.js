// Déclaration et importation des dépendances
const Book = require("../models/Book");

exports.postOneBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Livre créé !" }))
    .catch((error) => res.status(500).json({ error }));
};

exports.postRating = (req, res, next) => {
  const bookId = req.params.id;
  const { grade } = req.body;
  // Création de l'objet de notation
  const rating = {
    userId: req.auth.userId,
    grade: grade,
  };

  // Mettre à jour le livre avec la nouvelle note
  Book.findByIdAndUpdate(bookId, { $push: { ratings: rating } }, { new: true })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Le livre n'existe pas." });
      }
      // calculer la moyenne des notes
      const totalRatings = book.ratings.length;
      const sumOfRates = book.ratings.reduce(
        (total, rating) => total + rating.grade,
        0
      );
      book.averageRating = sumOfRates / totalRatings;

      // Enregistrer les modifications
      book.save().then(() => {
        res.status(200).json({ message: "Notation enregistrée avec succès." });
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.putOneBook = (req, res, next) => {
  const bookObject = req.file
    ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : { ...req.body };
  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book._userId !== req.auth.userId) {
        return res.status(401).json({ message: "Non autorisé" });
      }
      Book.updateOne(
        { _id: req.params.id },
        { ...bookObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Livre mis à jour" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteOneBook = (req, res, next) => {

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        res.status(500).json({ message: "Ce livre n'existe pas." });
      }

      Book.deleteOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })

        .then((book) => {

          if (book._userId !== req.auth.userId) {
            return res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimer ce livre." });
          }
          res.status(200).json(Book)
        })
        .catch((error) => res.status(400).json({ error }));
    })
};

exports.getBestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })  //Trie par ordre décroissant
    .limit(3) //Garder uniquement les 0 premiers
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};


exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Le livre n'existe pas." });
      }
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};


exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => {
      if (books === null) {
        res.status(204).json({ message: "Pas de livres" })
      } res.status(200).json(books)
    })
    .catch((error) => res.status(400).json({ error }));
};