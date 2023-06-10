const Book = require("../models/Book");

exports.postOneBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then((book) => res.status(201).json({ message: "Livre créé" }))
    .catch((error) => res.status(400).json({ error }));
  next();
};

// exports.postRating = (req, res, next) => {
// };

exports.putOneBook = (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then((Book) => res.status(200).json(Book))
    .catch((error) => res.status(400).json({ error }));
  next();
};

exports.deleteOneBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then((Book) => res.status(200).json(Book))
    .catch((error) => res.status(400).json({ error }));
  next();
};

// exports.getBestRating = (req, res, next) => {};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((Book) => res.status(200).json(Book))
    .catch((error) => res.status(400).json({ error }));
  next();
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((Books) => res.status(200).json(Books))
    .catch((error) => res.status(400).json({ error }));
  next();
};
